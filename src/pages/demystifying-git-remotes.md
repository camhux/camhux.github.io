---
path: "/demystifying-git-remotes"
title: "Demystifying Git Remotes"
date: "2015-08-31T13:24:59Z"
---

Remotes are a core reagent for the magic of Git, yet the common Github workflow of forking-and-cloning masks much of the complexity of the local-remote relationship. In this post, I will articulate how exactly Git handles remotes, and I will pull some common Git idioms into smaller pieces to reveal the inner workings of Git’s system of local-remote correspondence.

### By themselves, “remotes” are just addresses

Here’s maybe the most important thing to drill down: In isolation, a remote is just a pointer to another Git repository, stored someplace else, that you want your local repo to correspond with. After you invoke `git remote add <label> <url>`, but before you do anything else, there has not actually been a single bit of communication between your local repo and the specified remote repo. *Every interaction with a remote happens as a result of discrete actions.* No matter how intimately you work with it, a remote never proactively sends you anything. In fact, the remote repo doesn’t even know (or, after you push, remember) that your local repo exists. The only time a remote even cares *a little* about your local repo is when you’re trying to push new commits; think of `git push` as a bit like presenting a suggestion to a superior. You bundle up your branch, label it with a remote and a target branch, and send it off full of hope; this is the only situation the remote ever looks at your work, and it can instantly reject what you send if there’s a potential merge conflict.

### Fetching is fundamental to synchronizing with a remote

The commands `git clone` and `git pull` each trigger, rather obviously, some interaction with a remote repository -- they couldn’t do what they do without asking for and receiving data. Each of those, however, relies upon a more fundamental remote-oriented operation: the `git fetch`.

The fetch action is axial to Git, and worth meditating upon. Assuming you’ve already added a remote to your repository, any invocation of `git fetch <remote-name>` will either create or update your set of what are called *remote-tracking branches*. These are branches, stored entirely on your computer, that mirror the state of the remote you fetched, precisely at the time you fetched it. For every `<branch>` stored at a given `<remote>`, `git fetch <remote>` will create a branch labeled `<remote>/<branch>` inside your local repository.

Make sure that this is absolutely, imperiously clear: Remote-tracking branches exist *locally*, and they are the only way for Git to compare the state of your local repository to the state of a remote. You can view all of the remote-tracking branches in your local repo by invoking `git branch -r`. You’ll find a set for each remote that has ever been fetched, whether manually or as part of a `git clone` or `git pull`, and you can confirm that they’re automatically named `<remote>/<branch>`.

### Common commands rely on remote-tracking branches

Cloning and pulling are both elaborations of the fetch -- as in, `git clone` and `git pull` will each always execute a `git fetch`. When you clone a repository from a URL, the command first creates a new folder and initializes a git repository within, then immediately does the equivalent of `git remote add origin <URL>` followed up with a `git fetch origin`. (Note that origin is just a default name that can be overridden; the word has no magic power of its own.) After the fetch completes, you have a brand-new local repository, replete with a remote-tracking branch for every branch contained in the original repository. But `git clone` typically doesn’t stop here, because you *never* want to work directly on a remote-tracking branch. To help prevent you from doing this, `git clone` also automatically sets you up with a new *tracking branch*, called `master` by default, that in turn tracks against your `origin/master` remote-tracking branch. Then, with that relationship established, you can call `git status` to see whether your `master` branch is ahead or behind `origin/master` in commits.

Pulling is a bit less involved, but still interesting. When you invoke `git pull <remote> <branch>`, Git first executes `git fetch <remote>`. After the fetch completes, `git merge <remote>/<branch>` is invoked, which attempts to merge the computed remote-tracking branch into your active branch. Whether that merge succeeds or not, the `git fetch <remote>` has happened, and invoking `git branch -r` or `git log <remote>/<branch>` will reflect the updates to your remote-tracking branches.

### “Tracking branches” are just branches with an upstream reference

Tracking branches and remote-tracking branches exist fully locally on your computer, just the same as any branches you create yourself using the `git branch` command or the `git checkout -b` compound command. Remote-tracking branches are only special because they exist under the labels that `git fetch` and `git status` demand them to, and because of some config information that Git attaches to them for you; otherwise, they’re just branches like any others, but you don’t want to check them out and mess with them directly. (To this end, they also don’t show up when you invoke a plain `git branch`, without the `-r` flag.)

A tracking branch, in turn, is simply a branch that has been assigned an *upstream reference*. Some strange and subtle Git complexity now rears its head, because the lines separating references to locally-stored remote-tracking branches and references to *remote branches themselves* are oftentimes blurred by how Git handles them. Here is the simplest way I can decoct it:

1. Every tracking branch has a corresponding remote-tracking branch.
2. Every remote-tracking branch has a corresponding branch in a remote repository.
3. Every tracking branch *also* has a reference to the remote repository and branch that it tracks, without having to recover this information from the separate remote-tracking branch.
4. The term *upstream reference* can refer to any single one of these relationships, or collectively refer to all of them. Unless something goes wrong, all of these relationships are immediately established whenever any single one of these relationships is established.

There’s one last characteristic of tracking branches that’s worth mentioning here. If you’re working on a tracking branch and you invoke `git pull` or `git push` without any arguments, Git will reflexively pull from or push to the remote branch represented by your branch’s upstream reference. In the case of `git push`, those direct references I mentioned above are used, since pushing doesn’t have to pass through your remote-tracking branch to be executed (although, if you haven’t fetched in a while, there’s a chance the branch you’re pushing will conflict with newer commits in the remote and will be thusly rejected). `git pull`, in contrast, requires use of the remote-tracking branch, as previously discussed.

### You made it to the end and are an expert now
As a reward, have a list of commands that can create a tracking branch, entirely free of any helpful explanation or exegesis:
* `git branch <branch> <remote>/<branch>`
* `git branch -u <remote>/<branch>`
* `git checkout -b <branch> <remote>/<branch>`
* `git checkout -b <branch> -t <other-branch>`
* `git checkout <branch>` (Seriously.)
* `git pull <remote>`
* `git pull <remote> <branch>`
* `git push -u <remote>`
* `git push -u <remote> <branch>`
* `git push -u <remote> <local-branch>:<remote-branch>`
* And, of course, `git clone`
