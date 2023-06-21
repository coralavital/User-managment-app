function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 42269;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 42269 > /dev/null;
done;

for child in $(list_child_processes 42281);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/coralavital/Desktop/vscode/CRUD_Application/bin/Debug/net6.0/ed1a6fb0891148fba9bd3487aa869f7b.sh;
