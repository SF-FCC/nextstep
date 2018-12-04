
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
    git checkout -b <branchType>/<branch name>

    // branchtype examples

    setup/<branch name>
    feature/
    bug/
    style/
    refactor/


create a pull request

