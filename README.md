# Overview

This module will convert rich HTML on your clipboard to Markdown source code, and place that back onto your clipboard.  This can be useful for bloggers who write articles using Markdown, because they can copy a chunk of HTML from anywhere on the web, activate `clipdown` (possibly via a [global keyboard shortcut](#global-keyboard-shortcut)), and then paste Markdown source into their article.

Special thanks to the [breakdance](https://github.com/breakdance/breakdance) module, which does all the conversion magic behind the scenes.

Note that this module currently only works on macOS.

# Usage

First, make sure you have [Node.js](https://nodejs.org/en/download/) installed on your Mac.  Then, use [npm](https://www.npmjs.com/) to install the module as a command-line executable like so:

```
npm install -g clipdown
```

Depending on your machine and folder permissions, you might have to run the above command with `sudo`.

Now, try copying some rich HTML to your clipboard (i.e. from a web browser), and enter the following command into the Terminal:

```
clipdown
```

That's it!  Now try pasting into your Markdown text editor, and you will see nice Markdown source, with things like styling, links, lists, and tables automatically converted.

## Command-Line Options

Any command-line options specified in `--key value` format are passed directly to [breakdance](https://github.com/breakdance/breakdance).  Please see [their docs](https://breakdance.github.io/breakdance/docs.html#options) for details on which options you can pass here.  Example:

```
clipdown --comments --one
```

## Global Keyboard Shortcut

To add a global keyboard shortcut on macOS, you first need to wrap the call to `clipdown` in an AppleScript.  To do this, open the **Script Editor** application (located in Applications/Utilities), and enter this text:

```applescript
do shell script "/usr/local/bin/node /usr/local/bin/clipdown"
```

Please note that the location of your Node.js binary may be different than mine, so change `/usr/local/bin/node` to the correct location.  To determine what this should be, open Terminal and type `which node`.  This is important because AppleScripts run without a proper shell environment, so they are often missing things like your standard `PATH` variable.

Also note that the location of the installed `clipdown` binary may differ from mine, so change `/usr/local/bin/clipdown` to the correct location.  To determine what this should be, open Terminal and type `which clipdown`.

Once this is complete, save your AppleScript somewhere central such as in `~/Library/Scripts/`.

Next, you need to assign a global keyboard shortcut to the script.  To do this, you can either use a commercial application such as [Alfred](http://www.alfredapp.com/), [Keyboard Maestro](http://www.keyboardmaestro.com/main/), or [FastScripts](http://www.red-sweater.com/fastscripts/index.html), or you can do it the manual way...

1. Open **Automator** (located in your /Applications folder).
2. In the dialog that pops up, select **Quick Action** and click the **Choose** button.
3. In the search field on the left sidebar, enter `applescript`.
4. Drag the **Run AppleScript** action to the right-hand pane.
5. Paste the `do shell script...` line into the text field, replacing all the demo code.
6. From the menu bar, select **File** → **Save...** and give it a name such as `Clipdown`.
7. Quit Automator.
8. Open **System Preferences**, then click on the **Keyboard** icon.
9. Click on the **Shortcuts** tab, then click on **⚙️Services** on the left side.
10. Scroll down the right pane until you see your Quick Action (should be under **General**).
11. Click on your action and you should see a **Add Shortcut** button appear.  Click it.
12. Type your desired keyboard shortcut.
13. Quit System Preferences.

**Note:** These instructions are for macOS Mojave specifically.  Things may be quite different in older or newer OS versions.

# License (MIT)

**The MIT License**

*Copyright (c) 2019 Joseph Huckaby.*

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
