Basically just run 
gulp

_assets are copied into each site folder

##PUSHING TO GH-PAGES##
# To push stuff from one branch to another branch

git subtree push --prefix FOLDER REMOTE gh-pages

# To force:
git push REMOTE `git subtree split --prefix FOLDER BRANCH`:gh-pages --force