# 系统崩溃重启后 utmp 日志的回收过程
## 系统崩溃带来的问题
正常的情况下，当用户登出系统后，utmp 文件中的项目会更新，**更新状态与登出时间**。当系统崩溃时显然正常的登出过程**不会执行**，那么 utmp 文件中的相应项目**不会更新**。

对于这种情况如果不进行修复，那么下一次重新进入系统后**上一次的记录会残留。**

## manual 中的相关信息
查看 manual 发现在系统启动的时候 **init 进程**是**第一个访问** utmp 文件的程序。

init 进程会修改 utmp 中所有 ut_type 未设定为 DEAD_PROCESS 或 RUN_LVL 并且 ut_pid 指向的 pid 进程不存在的记录，将 ut_type 设定为 DEAD_PROCESS 并清除 ut_user、ut_host 与 ut_time。

manual 中相关的信息摘录如下：
```man
       The  first  entries  ever  created result from init(1) processing inittab(5).  Before an entry is processed, though, init(1) cleans up utmp by setting ut_type to
       DEAD_PROCESS, clearing ut_user, ut_host, and ut_time with null bytes for each record which ut_type is not DEAD_PROCESS or RUN_LVL and where no process  with  PID
       ut_pid exists.  If no empty record with the needed ut_id can be found, init(1) creates a new one.  It sets ut_id from the inittab, ut_pid and ut_time to the cur‐
       rent values, and ut_type to INIT_PROCESS.

       mingetty(8) (or agetty(8)) locates the entry by the PID, changes ut_type to LOGIN_PROCESS, changes ut_time, sets ut_line, and waits for connection to  be  estab‐
       lished.  login(1), after a user has been authenticated, changes ut_type to USER_PROCESS, changes ut_time, and sets ut_host and ut_addr.  Depending on mingetty(8)
       (or agetty(8)) and login(1), records may be located by ut_line instead of the preferable ut_pid.

       When init(1) finds that a process has exited, it locates its utmp entry by ut_pid, sets ut_type to DEAD_PROCESS, and clears ut_user,  ut_host  and  ut_time  with
       null bytes.

       xterm(1) and other terminal emulators directly create a USER_PROCESS record and generate the ut_id by using the string that suffix part of the terminal name (the
       characters following /dev/[pt]ty).  If they find a DEAD_PROCESS for this ID, they recycle it, otherwise they create a new entry.  If they can, they will mark  it
       as DEAD_PROCESS on exiting and it is advised that they null ut_line, ut_time, ut_user, and ut_host as well.

       telnetd(8)  sets  up  a  LOGIN_PROCESS entry and leaves the rest to login(1) as usual.  After the telnet session ends, telnetd(8) cleans up utmp in the described
       way.

       The wtmp file records all logins and logouts.  Its format is exactly like utmp except that a null username indicates a logout on the associated  terminal.   Fur‐
       thermore,  the  terminal name ~ with username shutdown or reboot indicates a system shutdown or reboot and the pair of terminal names |/} logs the old/new system
       time when date(1) changes it.  wtmp is maintained by login(1), init(1), and some versions of getty(8) (e.g., mingetty(8) or agetty(8)).  None of  these  programs
       creates the file, so if it is removed, record-keeping is turned off.
```

## 使用虚拟机来验证
使用虚拟机，正常登录，然后执行 who 命令查看登录信息。然后强制关机，重新开机后登录进系统再次执行 who 命令，输出正常。

