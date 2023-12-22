(() => {
  const logging = false,
    // If the user is using a Mac, we'll need to change the super key
    isMacUser = navigator.userAgent.indexOf("Mac") != -1,
    // Persistence for confirming solution proposed
    confirmProposingSolution =
      localStorage["its-extension-confirm-proposing-solution"] == "1",
    log = (str) => {
      if (logging) console.log(str);
    },
    sysID = NOW !== undefined && NOW.sysId !== undefined ? NOW.sysId : null,
    caseNumberID = "sys_readonly.sn_customerservice_case.number",
    caseNumber =
      document.getElementById(caseNumberID) !== null
        ? document.getElementById(caseNumberID).value
        : null,
    // Dictionary of text replacements
    replacements = {
      hyperlink: (() => {
        const startCode = '[code]<a href="" target="_blank">';
        return {
          startCode: startCode,
          endCode: "</a>[/code]",
          // Move the cursor into the href attribute
          selectionEnd: startCode.indexOf('"') + 1,
        };
      })(),
      bold: {
        startCode: "[code]<b>",
        endCode: "</b>[/code]",
      },
      italic: {
        startCode: "[code]<i>",
        endCode: "</i>[/code]",
      },
      image: {
        startCode: `[code]<img src="`,
        endCode: `" width=600px />[/code]`,
      },
      // Numbered list
      orderedList: {
        startCode: "[code]\n<ol>\n<li>\n",
        endCode: "\n</li>\n</ol>\n[/code]",
      },
      // Bullet list
      unorderedList: {
        startCode: "[code]\n<ul>\n<li>\n",
        endCode: "\n</li>\n</ul>\n[/code]",
      },
      // Inline code block
      code: {
        startCode:
          "[code]<code style='display: inline-block; border: 0.5px solid #BBBBBB; border-radius: 1px; background-color: #E5E5E5; padding: 5px; margin-left: 3px; margin-right: 2px;'>",
        endCode: "</code>[/code]",
      },
      // Blockquote block
      blockquote: {
        startCode:
          "[code]<blockquote style='border-left: 3px solid #00629B; padding: 1em;'>\n[/code]",
        endCode: "[code]\n</blockquote>[/code]",
      },
      listItem: {
        startCode: "<li>\n",
        endCode: "\n</li>",
      },
      paragraph: {
        startCode: "[code]<p>\n",
        endCode: "\n</p>[/code]",
      },
    },
    // Command to commit text replacement
    editHighlighted = function (command, selection) {
      log("in command");

      // Get focus element, character bounds
      const textArea = selection.focusNode.querySelector("textarea,input"),
        start = textArea.selectionStart,
        end = textArea.selectionEnd,
        lastChar = textArea.value.substring(end - 1, end) === " ",
        optionalSpace = lastChar ? " " : "";

      var startCode,
        endCode,
        selectionEnd = -1;

      // Make sure that the command is valid
      if (!Object.keys(replacements).includes(command)) {
        return;
      }

      // Get replacement, start and end codes
      const replacement = replacements[command];
      startCode = replacement.startCode;
      endCode = replacement.endCode;

      //  If the replacement has a selectionEnd, use that info, otherwise calculate it.
      if (Object.keys(replacement).includes("selectionEnd")) {
        selectionEnd = start + replacement.selectionEnd;
      } else {
        selectionEnd =
          end - start > 0
            ? end + startCode.length + endCode.length
            : start + startCode.length;
      }

      // Insert text
      const insertedText =
        startCode +
        textArea.value.substring(start, end).trim() +
        endCode +
        optionalSpace;
      // This is deprecated but it's the only way to insert text
      document.execCommand("insertText", false, insertedText);
      setTimeout(() => {
        textArea.blur();
        textArea.focus();
      }, 10);
      textArea.selectionEnd = selectionEnd;
    },
    keyDown = (e) => {
      const selection = document.getSelection();

      log(selection);

      if ((isMacUser && e.metaKey) || (!isMacUser && e.ctrlKey)) {
        const shiftDown = e.shiftKey,
          letter = e.key.toLowerCase();

        if (letter == "x" && shiftDown == true) {
          if (
            confirm(
              "Are you sure you would like to " +
                (confirmProposingSolution ? "disable" : "enable") +
                " the confirmation dialog before proposing solution on a ticket?",
            )
          ) {
            localStorage["its-extension-confirm-proposing-solution"] =
              !confirmProposingSolution ? "1" : "0";
            alert(
              "The confirmation dialog has been " +
                (confirmProposingSolution ? "disabled" : "enabled") +
                ". Please reload the page for it to take effect.",
            );
            e.preventDefault();
            return;
          }
        }

        // if (
        //   letter == "c" &&
        //   shiftDown == true &&
        //   sysID !== null &&
        //   selection. // Don't interfere with <code> command
        // ) {
        //   navigator.clipboard.writeText(sysID);
        //   e.preventDefault();
        //   return;
        // }

        if (
          selection.focusNode !== selection.anchorNode ||
          selection.focusNode === undefined ||
          selection.focusNode === null ||
          selection.focusNode.nodeType === 3 ||
          !selection.focusNode.querySelector("textarea,input")
        )
          return;

        for (var command in keyCombinations) {
          const combo = keyCombinations[command],
            comboMatches = combo[0] == shiftDown && combo[1] == letter;
          if (comboMatches) {
            e.preventDefault();
            editHighlighted(command, selection);
            return;
          }
        }
      }
    },
    paste = (e) => {
      const selection = document.getSelection();
      if (
        selection.focusNode !== selection.anchorNode ||
        selection.focusNode === undefined ||
        selection.focusNode === null ||
        selection.focusNode.nodeType === 3 ||
        !selection.focusNode.querySelector("textarea")
      )
        return;
      const originalPasteText = (
        e.clipboardData || window.clipboardData
      ).getData("text");
      var pasteText = originalPasteText;
      if (
        (pasteText.includes("TECHNAME") || pasteText.includes("tech_name")) &&
        NOW !== undefined &&
        NOW.user !== undefined
      ) {
        pasteText = pasteText.replaceAll(
          /TECHNAME|tech_name/g,
          `${NOW.user.firstName} ${NOW.user.lastName}`,
        );
      }
      if (pasteText.includes("CASE") && caseNumber !== null) {
        pasteText = pasteText.replaceAll(/CASE/g, caseNumber);
      }
      if (pasteText.includes("received from: no-reply@duosecurity.com")) {
        pasteText = pasteText.replaceAll(
          /(received from: no-reply@duosecurity\.com[\n\r]+)|([\n\r]User.*\?referer=email)/g,
          "",
        );
      }
      if (pasteText.includes("SYSID") && sysID !== null) {
        pasteText = pasteText.replaceAll(/SYSID/g, sysID);
      }

      if (pasteText.endsWith("?t=large")) {
        pasteText = pasteText.slice(0, -1 * "?t=large".length);
      }

      if (pasteText !== originalPasteText) {
        document.execCommand("insertText", false, pasteText);
        e.preventDefault();
      }
    },
    createButtonRow = (id, action, text, classes) => {
      const $rowElement = document.createElement("div"),
        $buttonElement = document.createElement("button");
      $rowElement.classList.add("row");
      $buttonElement.id = id;
      $buttonElement.innerText = text;
      $buttonElement.onclick = action;
      if (classes !== undefined) {
        classes.forEach((className) => $buttonElement.classList.add(className));
      }
      $rowElement.appendChild($buttonElement);
      return $rowElement;
    };

  //[shift, letter]
  var keyCombinations = {
    hyperlink: [false, isMacUser ? "k" : "q"],
    bold: [false, "b"],
    italic: [false, "i"],
    image: [true, "i"],
    orderedList: [false, "o"],
    unorderedList: [false, "u"],
    code: [true, "c"],
    blockquote: [true, "b"],
    listItem: [false, "l"],
    paragraph: [false, "p"],
  };

  setTimeout(() => {
    window.addEventListener("keydown", keyDown);
    window.addEventListener("paste", paste);
    if (Math.floor(Math.random() * 10) === 0) {
      [].slice
        .call(
          document.querySelectorAll(
            'button[data-action-name="saveAndStayCase"]',
          ),
        )
        .forEach((button) => (button.innerText = "Save and Slay"));
    }
    if (
      caseNumber !== null &&
      sysID !== null &&
      document.getElementById("moreOptionsContainer") !== undefined &&
      document
        .getElementById("moreOptionsContainer")
        .querySelector(".popover-body") !== undefined
    ) {
      const $moreOptionsPopover = document
          .getElementById("moreOptionsContainer")
          .querySelector(".popover-body"),
        $lastRow = [].slice.call(
          $moreOptionsPopover.querySelectorAll(".row"),
          -1,
        )[0];
      if ($lastRow !== undefined) {
        const buttons = [
          createButtonRow(
            "button-copy-customer-link",
            () => {
              navigator.clipboard.writeText(
                `https://support.ucsd.edu/services?id=ticket&table=sn_customerservice_case&sys_id=${sysID}`,
              );
            },
            "Copy Customer Link",
            ["icon-copy"],
          ),
          createButtonRow(
            "button-copy-agent-link",
            () => {
              navigator.clipboard.writeText(
                `https://support.ucsd.edu/nav_to.do?uri=task.do?sysparm_query=number=${caseNumber}`,
              );
            },
            "Copy Agent Link",
            ["icon-copy"],
          ),
          createButtonRow(
            "button-copy-sys-id",
            () => {
              navigator.clipboard.writeText(sysID);
            },
            "Copy System ID",
            ["icon-copy"],
          ),
        ];
        buttons.toReversed().forEach(($button) => {
          $lastRow.after($button);
        });
      }
    }
    if (confirmProposingSolution) {
      [].slice
        .call(
          document.querySelectorAll(
            'button[data-action-name="proposeSolution"]',
          ),
        )
        .forEach((button) => {
          button.innerText = "Propose Solution*";
          button.setAttribute(
            "onclick",
            "if(confirm('Are you sure you would like to propose solution on this case?')) " +
              button.getAttribute("onclick"),
          );
        });
    }
  }, 500);

  window.confirmProposingSolution = confirmProposingSolution;
})();
