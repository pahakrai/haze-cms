## Auto Create Module

Execute the following commands before you intend to use them, because subsequent operations are irrevocable

    git add -A

Open file `src/Lib/createrConfig/constant.js`

      // Modify this line
      // The first letter is lowercase unless you want it to be capitalized
    - const name = 'streetRoute';
    + const name = 'your module name';

Then you can execute the following commands

    # Create page base code
    yarn creater:page
    # Create redux base code
    yarn creater:page

Final , check for each modified file
