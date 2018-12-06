# nextstep

### Git workflow

fork the repo on github

clone the repo from the forked copy

    $ git remote -v

    origin	https://github.com/<UserName>/nextstep.git (fetch)
    origin	https://github.com/<UserName>/nextstep.git (push)

    $ git remote add upstream git@github.com:xChristianZx/nextstep.git
    $ git remote -v

    origin	https://github.com/<UserName>/nextstep.git (fetch)
    origin	https://github.com/<UserName>/nextstep.git (push)
    upstream	git@github.com:xChristianZx/nextstep.git (fetch)
    upstream	git@github.com:xChristianZx/nextstep.git (push)

do the following from master

    git fetch upstream
    git checkout -b development upstream/development

create new branch to work off of

    git checkout -b <branch type>/<branch name>

    // branch type examples

    setup/<branch name>
    feature/
    bug/
    style/
    refactor/

rebase and push your changes to your forked repo 

    // while in new branch...
  
    git fetch upstream
    git rebase upstream/development
    git push -u origin <branch_name>

create the pr via your fork

alternatively if you are collaborator you may push your new branch directly to the primary repo and pr from there
    
    // while in new branch...
    
    git fetch upstream
    git rebase upstream/development
    git push -u upstream <branch_name>
    
request branch pr

sometimes pr will still need rebase or merge resolution - in that case follow these [directions](https://github.com/edx/edx-platform/wiki/How-to-Rebase-a-Pull-Request)

tldr; checkout locally then rebase followed by force push

for all pull requests, prefer squashing commits unless its a large pr

Happy coding!

# Startup

### Ports
    Client: localhost:3000
    Server: localhost:5000

While in `/server` directory - 
### Run both `/client` and `/server`
    npm run dev
*`Concurrently` will reload `/client` and/or `/server` when changes are made to files in their respective directories*

Additionally you can still run both independently with 
```
npm run server
npm run client
```

#### Note: If running from only server (localhost:5000), you need to run `npm run build` within `/client` first so that it can serve those static files.