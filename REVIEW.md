## CLIENT

## index.js

- Issue: Token reset logic shouldn't be a side effect of index.js
- Solution: separate out token and redirect logic out

## styleReset.css

- Issue: Global styles is merged with reset logic
- Solution: Globals should be moved to globals.module.css

## axios-helper.js

- Issue: making config call is redundant
- Solution: Use axios.defaults.headers to reduce redundancy

## cookie-helper.js

- Method naming could have more semantic meaning
- Rename to "getCookie", "setCookie"

## date-helper.js

- Lacks info on types for args for functions
- Use JSDOCs

# reducers

    - Payload is redundant and non-descriptive
    - Destructure payload SEE LINK (https://redux.js.org/recipes/structuring-reducers/updating-normalized-data)

# reducers/jobApp.js

    - Issue: JOB_APP_UPDATE is causing the sort error in tracker after update
    - Solution: Use map instead and if(jobApp.id === payload.id) then return payload

# reducers/user.js, jobApp.js

- Should refactor out all the UI/ MSG'ing state into it's own reducer

# /data

- Could rebuilt for an improved implementation (Should be a Feature for future spec'ing)

# /config

- When session expires, user is not automatically logged out and could potentially lose state on what they were working on.

# /actions

- Refactor files to match reducers
- register and requestLogin AC's should be refactored to match try/catch pattern

# Components - Prop-Types

- Any PT's that are required need "isRequired"
- All others need a default

# Components - All

- Issue: Calling prop functions within render is difficult to read and follow
- Solution: any prop functions should be called within a class method

- Issue: Functional components event handlers use anonymous functions
- Solution: remove anon function call and just pass function

# components/AccountForm.js

- Break out form validation to separate file/ logic

# components/AccountForm.js & .css
- Separate out save_button and primary button to either global or to module