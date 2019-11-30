#!
git ls-files |grep -v -E "adminsdk|functions/" |tar cfz /tmp/foo.tgz -T -
# cd ~/Downloads/github.com/fedex1/leaderboard-as-a-service
cd ../../../../../../github.com/fedex1/leaderboard-as-a-service
tar xvf /tmp/foo.tgz
