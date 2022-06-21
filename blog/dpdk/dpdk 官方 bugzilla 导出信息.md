```
Bug ID	Product	Component	Assignee	Status	Resolution	Summary	Changed
42	DPDK	cryptodev	akhil.gupta@puresoftware.com	IN_PROGRESS	 ---	Crypto_mrvl error with multiple instances	2018/7/15 6:42
100	DPDK	testpmd	alejandro.lucero@netronome.com	RESOLVED	FIXED	testpmd deadlock	2018/11/8 12:43
122	lab	UNH infra	ci@dpdk.org	RESOLVED	INVALID	Performance results are not correct on Intel I40E environments	2020/4/21 15:47
193	DPDK	ethdev	mk@semihalf.com	RESOLVED	FIXED	symmetric_mp example application crashes for Amazon ENA in multiple process mode	2019/1/26 0:54
278	DPDK	ethdev	3chas3@gmail.com	CONFIRMED	 ---	bond_ethdev_rx_burst multithread access bond's different queue will crash	2019/5/15 22:59
301	DPDK	ethdev	rasland@nvidia.com	RESOLVED	INVALID	DPDK driver is crashing for Mellanox-5 NIC card	2019/7/12 10:20
431	lab	job scripts	ci@dpdk.org	RESOLVED	FIXED	Missing performance results in Patchwork checks, and possible false positives	2020/6/2 13:53
442	SPP	main	yasufum.o@gmail.com	CONFIRMED	 ---	disable ASLR is been highly recommended	2020/8/3 6:45
443	SPP	main	yasufum.o@gmail.com	CONFIRMED	 ---	spp primary takes up the complete hugepages	2020/8/5 7:52
82	DPDK	examples	honnappa.nagarahalli@arm.com	RESOLVED	FIXED	Failure to compile l3fwd example on ARM	2020/4/26 2:47
104	DPDK	core	reshma.pattan@intel.com	RESOLVED	WORKSFORME	"dpdk-procinfo" received signal SIGSEGV, Segmentation fault.	2018/11/2 9:54
259	DPDK	testpmd	konstantin.ananyev@intel.com	RESOLVED	DUPLICATE	unable to run sample t3 as bpf-load for testpmd	2019/7/25 10:54
315	DPDK	vhost/virtio	dev@dpdk.org	RESOLVED	WORKSFORME	Virtio crypto does not work . Tried with vhost crypto as backend and dpdk test application (cryptodev_virtio_autotest )	2019/11/21 3:09
352	DPDK	examples	Muthurajan.Jayakumar@intel.com	UNCONFIRMED	 ---	Bifurcated Driver X710 for ipv6 flow rule addition not working	2019/10/11 19:49
425	lab	job scripts	ci@dpdk.org	RESOLVED	WONTFIX	Eth Tests - Link Status Checks	2020/6/30 22:27
426	lab	job scripts	ci@dpdk.org	RESOLVED	FIXED	Eth Tests - MTU Checks	2020/6/30 20:00
439	DPDK	ethdev	marko.kovacevic@intel.com	UNCONFIRMED	 ---	memif pmd is allocating from Node 0, even after passing Node 1 in eal args	2020/4/10 10:48
453	SPP	ctl	yasufum.o@gmail.com	CONFIRMED	 ---	SPP-CTL does not run with python2.7	2020/4/24 4:17
500	lab	Intel Lab	zhaoyan.chen@intel.com	RESOLVED	FIXED	Compilation failing in Intel CI since 07/04	2020/7/16 15:26
505	DPDK	core	jerinjacobk@gmail.com	CONFIRMED	 ---	[dpdk-20.08] meson build 32-bits failed on ubuntu20.04	2020/7/10 11:55
515	DTS	tests	dts@dpdk.org	UNCONFIRMED	 ---	DTS must _not_ modify DPDK sources	2020/8/3 9:37
375	lab	job scripts	ci@dpdk.org	RESOLVED	WONTFIX	run basic DTS functional tests	2020/4/21 16:20
427	lab	job scripts	ci@dpdk.org	RESOLVED	WONTFIX	Eth Tests - Promiscuous Support	2020/6/30 20:01
428	lab	job scripts	ci@dpdk.org	RESOLVED	FIXED	Eth Tests - Hardware Checksum Checks	2020/6/30 20:02
451	lab	job scripts	blo@iol.unh.edu	CONFIRMED	 ---	Split dpdk-ci and dpdklab-ci scripts	2020/6/30 20:10
459	lab	UNH infra	ci@dpdk.org	RESOLVED	FIXED	Performance Turning and Results Stability Issues on NXP test environment	2020/6/16 14:51
468	DPDK	ethdev	kevuzaj@gmail.com	RESOLVED	FIXED	bnxt: build fail with gcc10 default fno-common	2020/5/6 15:29
476	lab	job scripts	ci@dpdk.org	RESOLVED	FIXED	Run mingw-w64 compilation on windows	2020/6/25 15:12
489	lab	UNH infra	blo@iol.unh.edu	IN_PROGRESS	 ---	Broadcom 100Gbe NIC Upgrade	2020/7/14 22:51
149	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	Add GA Performance results to the database	2018/12/10 20:44
169	lab	job scripts	dpdklab@iol.unh.edu	RESOLVED	WONTFIX	Create GA performance Jenkins Job	2020/4/7 15:23
2	DPDK	eventdev	dev@dpdk.org	RESOLVED	INVALID	Test bugs for checking the bug flow, no need any fix	2018/7/18 19:47
5	DPDK	other	dev@dpdk.org	RESOLVED	WONTFIX	This is a Bug, Please Disabled Create new Account	2018/7/15 6:50
6	DPDK	other	dev@dpdk.org	CONFIRMED	 ---	dpdk-pdump leads to ovs-vswitchd crash	2020/1/9 8:19
14	DPDK	other	batmanustc@gmail.com	CONFIRMED	 ---	Kernel Crash bug of ixgbevf kernel module in "Intel(R) 10GbE PCI Express Virtual Function Driver Version: 4.0.3 Release: 1" and the latest version	2018/9/16 0:13
15	DPDK	core	dev@dpdk.org	CONFIRMED	 ---	Kernel crash after "Detected Tx Unit Hang" report	2018/2/6 14:28
56	DPDK	other	dev@dpdk.org	RESOLVED	FIXED	crash when freeing memory with no mlx5 device attached	2018/6/28 21:01
88	DPDK	eventdev	harry.van.haaren@intel.com	CONFIRMED	 ---	DPDK service core getting crashed with eventdev scheduler	2018/9/21 11:53
89	DPDK	ethdev	qi.z.zhang@intel.com	RESOLVED	WONTFIX	XL710 DPDK i40evf : Ping is not working when RSS enabled for IP	2018/10/23 3:04
97	DPDK	core	dev@dpdk.org	RESOLVED	FIXED	rte_memcpy() moves data incorrectly on Ubuntu 18.04 on Intel Skylake	2019/7/11 9:52
106	DPDK	core	dev@dpdk.org	RESOLVED	FIXED	running dpdk-procinfo or any secondary leading to system memory exhaustion	2018/11/13 18:03
179	DPDK	other	anatoly.burakov@intel.com	RESOLVED	FIXED	mp_socket is not well handled when secondary process is exited	2019/1/10 13:50
188	DPDK	testpmd	yskoh@mellanox.com	RESOLVED	FIXED	significant multi-core performance degradation with SR-IOV/macswap in some cases	2019/1/14 20:20
194	DPDK	vhost/virtio	maxime.coquelin@redhat.com	CONFIRMED	 ---	vhost pmd has become unusable from secondary processes.	2019/7/9 13:55
199	DPDK	examples	qi.z.zhang@intel.com	RESOLVED	FIXED	Azure DPDK 18.11 Multiple Processes Example Support	2019/7/11 10:14
240	lab	job scripts	alialnu@mellanox.com	RESOLVED	FIXED	nic_single_core_perf test reports 0's for absolute values when it should fail	2020/7/9 15:42
333	DPDK	core	thomas@monjalon.net	UNCONFIRMED	 ---	PCI devices not found when DPDK is linked as dynamic libraries	2019/7/22 9:35
363	DPDK	other	maxime.coquelin@redhat.com	RESOLVED	FIXED	CVE-2019-14818	2019/12/2 13:32
371	DPDK	testpmd	asafp@nvidia.com	RESOLVED	INVALID	mlx5: failed to probe the port at testpmd (DPDK 19.11-rc3)	2020/6/23 14:18
379	DPDK	other	dev@dpdk.org	RESOLVED	INVALID	Build fail using dpdk-setup.sh in RedHat version 3.10.0-862.rt56.804.el7.x86_64	2020/1/3 11:31
389	DPDK	core	scott_wasson@affirmednetworks.com	RESOLVED	FIXED	Crash in librte_kni driver due to noncontiguous pages	2020/4/26 2:40
405	DPDK	ethdev	matan@mellanox.com	CONFIRMED	 ---	mlx5: the guest driver doesn't enforce the MTU set by rte_eth_dev_set_mtu()	2020/6/23 14:14
461	DPDK	ethdev	qi.z.zhang@intel.com	UNCONFIRMED	 ---	i40evf link status is always down with the Intel XL710 driver	2020/5/15 15:50
471	DPDK	other	dev@dpdk.org	RESOLVED	DUPLICATE	failing to build test from app/test	2020/5/13 10:43
478	DPDK	ethdev	jeanprincemello@gmail.com	RESOLVED	FIXED	Unable to build igb_uio kernel module on Ubuntu 18.04	2020/5/15 15:52
486	DPDK	ethdev	dev@dpdk.org	RESOLVED	INVALID	i40e driver has very bad performance when VXLAN TSO is enabled	2020/7/30 5:45
495	lab	job scripts	blo@iol.unh.edu	RESOLVED	FIXED	make builds are getting stuck	2020/7/13 15:25
518	DPDK	ethdev	jia.guo@intel.com	UNCONFIRMED	 ---	Disabling a VF with XL710 still sees the traffic and the link is still high	2020/8/3 7:51
4	DPDK	testpmd	salehals@mellanox.com	CONFIRMED	 ---	Segfault while running txonly mode with 4 16B SGEs packets	2018/8/2 8:04
7	DPDK	ethdev	motih@mellanox.com	RESOLVED	FIXED	mlx4 PMD does not receive broadcast packets in promiscuous mode.	2020/5/12 15:55
9	DPDK	other	dev@dpdk.org	RESOLVED	INVALID	qays	2018/6/16 2:28
27	DPDK	core	yskoh@mellanox.com	RESOLVED	INVALID	Can't build mlx5 from 18.02 on CentOS Linux release 7.4.1708 with kernel 3.10.0-693.11.1.el7.x86_64	2019/10/25 9:28
49	DPDK	mk	dev@dpdk.org	RESOLVED	FIXED	Compile error kni_net.c unknown field ‘ndo_change_mtu’	2018/5/31 6:53
53	DPDK	core	bruce.richardson@intel.com	RESOLVED	WONTFIX	rte abort issue on FreeBSD	2018/9/28 14:52
54	DPDK	ethdev	dev@dpdk.org	VERIFIED	FIXED	i40e port link status no updated for interrupt mode	2018/5/31 16:11
55	DPDK	ethdev	qi.z.zhang@intel.com	RESOLVED	FIXED	I40E PMD driver in vector mode implicitly requires number of RX descriptors in a ring to be power of two	2018/11/13 4:24
59	DPDK	core	dev@dpdk.org	RESOLVED	INVALID	Cannot start secondary processes anyhow on Redhat EL7	2018/7/10 0:14
60	DPDK	eventdev	harry.van.haaren@intel.com	RESOLVED	FIXED	rte_event_port_unlink() causes subsequent events to end up in wrong port	2018/9/26 16:28
63	DPDK	other	mk@semihalf.com	RESOLVED	FIXED	AWS ENA driver does not work with zero rx queues.	2018/7/20 9:57
65	DPDK	ethdev	beilei.xing@intel.com	RESOLVED	WORKSFORME	Tx VLAN offload not working on DPDK 17.11 LTS i40e PMD	2018/10/23 3:03
77	DPDK	examples	dev@dpdk.org	RESOLVED	FIXED	[Interrupt app]: failed to start interrupt app.	2018/7/26 17:21
85	DPDK	core	geoffrey.lv@gmail.com	RESOLVED	FIXED	pci_scan_one() issue	2019/1/24 14:16
86	DPDK	ethdev	konstantin.ananyev@intel.com	RESOLVED	FIXED	Requested device cannot be used	2018/9/14 14:30
90	DPDK	meson	ferruh.yigit@intel.com	IN_PROGRESS	 ---	DPDK Installation fails on Centos	2018/9/20 16:25
93	DPDK	cryptodev	pablo.de.lara.guarch@intel.com	CONFIRMED	 ---	crypto vdev create will reset the dev_started flag  when one dpdk process has been up the crypto vdev	2019/1/5 16:25
101	DPDK	testpmd	alejandro.lucero@netronome.com	RESOLVED	FIXED	18.11-RC1/ Testpmd start fail	2018/11/8 12:44
110	DPDK	other	xueqin.lin@intel.com	RESOLVED	FIXED	system hang when device deleted for hotplug function(igb uio)	2018/11/28 2:47
115	DPDK	other	a.latifi.al@gmail.com	CONFIRMED	 ---	pktgen panic when using big sized pcap file	2018/12/2 17:25
116	DPDK	ethdev	konstantin.ananyev@intel.com	RESOLVED	FIXED	Single-port, multi-core and multi-queue mode (open RSS), when configuring IP, may cause dpdk coredump	2019/1/16 10:40
191	DPDK	other	maria.lingemark@ericsson.com	RESOLVED	FIXED	Sometimes timers (rte_timer) do not expire	2019/1/21 12:41
196	DPDK	ethdev	konstantin.ananyev@intel.com	RESOLVED	WONTFIX	IXGBE Driver Tx Packet/Bytes counters Sent returns Zero even though link-partner received valid packets	2019/6/3 7:30
204	DPDK	core	beilei.xing@intel.com	CONFIRMED	 ---	Crash on Vmware esxi host when dpdk guest reboots.	2019/3/16 14:51
210	lab	job scripts	ferruh.yigit@intel.com	CONFIRMED	 ---	Patches with dependency fails to apply	2020/7/1 13:36
216	DPDK	examples	gain1974@gmail.com	RESOLVED	FIXED	rte_eth_rx_burst   nb_pkts   issue	2019/3/16 14:47
236	DPDK	core	anatoly.burakov@intel.com	RESOLVED	INVALID	primary-secondary model is failing	2019/4/2 12:42
241	DPDK	vhost/virtio	dev@dpdk.org	CONFIRMED	 ---	QEMU (vIOMMU+virtio) crashes when DPDK exits	2020/3/16 7:07
248	DPDK	ethdev	p.oltarzewski@gmail.com	CONFIRMED	 ---	Bonding PMD: Invalid array dimension in TX burst for 802.3ad mode with fast queue leads to SEGFAULT	2019/4/15 12:00
256	DPDK	ethdev	3chas3@gmail.com	RESOLVED	FIXED	Transmit or receive packets use the bond MAC is failed when switch backup port to active	2020/7/23 22:30
265	DPDK	ethdev	qi.z.zhang@intel.com	RESOLVED	FIXED	i40e flow flush & add new flow will occur segfault	2020/4/26 2:45
280	DPDK	doc	beilei.xing@intel.com	CONFIRMED	 ---	X710 PF Reset Issue with DPDK VF Driver	2019/7/15 21:02
284	DPDK	other	ferruh.yigit@intel.com	CONFIRMED	 ---	Secondary not able to Rx/TX after primary dies in symmetric multiprocess	2019/8/14 16:36
285	DPDK	other	jananeex.m.parthasarathy@intel.com	RESOLVED	FIXED	rte_table unit test crashes in ipv6	2019/7/15 20:58
296	DPDK	ethdev	dev@dpdk.org	CONFIRMED	 ---	max_rx_pkt_len issues with i40e dpdk SRIOV driver net_i40e_vf.	2019/9/12 7:07
297	DPDK	ethdev	lavaraj@gmail.com	CONFIRMED	 ---	max_rx_pkt_len issues with i40e dpdk SRIOV driver net_i40e_vf.	2019/7/15 20:51
304	DPDK	ethdev	ullas-d.bhat@hpe.com	RESOLVED	INVALID	[bnx2x_init] Initialization failed, stack notified driver is NOT running!	2019/8/6 19:55
312	DPDK	ethdev	beilei.xing@intel.com	RESOLVED	FIXED	i40evf could not receive mulicast packets	2020/4/26 2:45
319	DPDK	ethdev	beilei.xing@intel.com	UNCONFIRMED	 ---	dpdk-i40e could not receive vlan packet whose ip_len was bigger than 1496	2019/11/7 7:42
355	DPDK	meson	dev@dpdk.org	RESOLVED	FIXED	Meson build failure	2019/12/2 18:16
366	DPDK	ethdev	ajit.khaparde@broadcom.com	CONFIRMED	 ---	i40e PMD returns 0 for secondary invoking rx_burst on queue 0, when Primary dies	2020/1/27 5:40
369	DPDK	examples	pbhagavatula@marvell.com	UNCONFIRMED	 ---	l2fwd-event fails for service core mask	2019/11/26 20:45
372	DPDK	ethdev	konstantin.ananyev@intel.com	UNCONFIRMED	 ---	ixgbevf: cannot probe or start port if PF link is unstable	2019/11/27 20:34
378	DPDK	core	dev@dpdk.org	UNCONFIRMED	 ---	takes more than 500ms to allocate memory from numa node1	2020/1/2 4:43
393	DPDK	core	anatoly.burakov@intel.com	UNCONFIRMED	 ---	rte_zmalloc_socket does not zero memory	2020/2/20 12:46
397	DPDK	ethdev	dev@dpdk.org	RESOLVED	WORKSFORME	support-multi-driver=1 does not work in i40e PMD	2020/3/23 12:48
418	DPDK	ethdev	dev@dpdk.org	UNCONFIRMED	 ---	failsafe/tap PMD drops first UDP packet	2020/3/11 2:29
433	SPP	main	yasufum.o@gmail.com	CONFIRMED	 ---	suggested URL for DPDK-Suricata is limited or not working	2020/8/5 6:29
441	SPP	main	yasufum.o@gmail.com	CONFIRMED	 ---	link is broken	2020/4/8 11:10
447	DPDK	ethdev	konstantin.ananyev@intel.com	IN_PROGRESS	 ---	ixgbe: ixgbe_dev_link_update_share() leaks memory and memory mappings due to not cleaning up pthreads	2020/4/14 12:33
449	DPDK	ethdev	dev@dpdk.org	CONFIRMED	 ---	Fortville X710 FDIR with flow APIs broken	2020/5/15 10:24
454	SPP	ctl	yasufum.o@gmail.com	UNCONFIRMED	 ---	Documentation does callout the dependency for python modules in SPP-CTL	2020/4/23 10:28
455	SPP	ctl	yasufum.o@gmail.com	UNCONFIRMED	 ---	spp does not run with python3	2020/4/23 10:32
457	SPP	main	yasufum.o@gmail.com	UNCONFIRMED	 ---	rte_mempool_create is based on lcore socketid and not the port socketid	2020/4/23 7:04
463	DPDK	testpmd	suanmingm@mellanox.com	RESOLVED	FIXED	In Mellanox MLX5 driver, NULL pointer access in mlx5_ipool_malloc()	2020/5/13 4:50
472	DPDK	other	david.marchand@redhat.com	UNCONFIRMED	 ---	failure in unit/self test	2020/5/13 19:31
473	DPDK	other	thomas@monjalon.net	UNCONFIRMED	 ---	variance in test case fail for static and shared build binaries	2020/5/19 13:32
474	DPDK	other	thomas@monjalon.net	UNCONFIRMED	 ---	auto-test report crash while manual test skips	2020/5/18 17:20
484	DPDK	other	hrvoje.habjanic@zg.ht.hr	UNCONFIRMED	 ---	rte_sched_subport_free function does not free subport memory	2020/5/26 20:12
485	DPDK	other	hrvoje.habjanic@zg.ht.hr	UNCONFIRMED	 ---	pipe_profile_check function have wrong argument size	2020/6/15 19:20
488	DPDK	other	matan@mellanox.com	CONFIRMED	 ---	mlx4: cannot reattach devices	2020/6/23 14:03
499	DPDK	meson	ferruh.yigit@intel.com	RESOLVED	FIXED	failed to start example after use meson/ninja build 32-bit app on x86 system	2020/8/19 3:11
501	DPDK	ethdev	jia.guo@intel.com	RESOLVED	FIXED	igb: segfault in rte_eth_tx_done_cleanup() when using advanced descriptors	2020/8/4 18:43
502	lab	UNH infra	blo@iol.unh.edu	RESOLVED	FIXED	False negative for Windows compilation	2020/7/6 20:17
503	DPDK	core	dev@dpdk.org	RESOLVED	FIXED	can not detected device when use meson build dpdk	2020/7/13 7:25
517	DPDK	testpmd	jia.guo@intel.com	UNCONFIRMED	 ---	Traffic Class Assignment	2020/8/3 10:07
1	DPDK	other	dev@dpdk.org	CONFIRMED	 ---	Green goal: power efficiency with all hardwares	2018/2/7 15:38
3	DPDK	doc	qian.q.xu@intel.com	RESOLVED	INVALID	Test bug	2017/9/14 11:46
8	DPDK	core	ferruh.yigit@intel.com	IN_PROGRESS	 ---	Debug/error output should go to stderr	2018/12/20 20:12
10	DPDK	testpmd	nounoussma@hotmail.com	CONFIRMED	 ---	[Testpmd] NUMA, speed issue	2018/8/29 20:14
12	DPDK	ethdev	dev@dpdk.org	RESOLVED	INVALID	Request for submit in Kernel Upstream	2020/5/10 18:25
13	DPDK	ethdev	beilei.xing@intel.com	IN_PROGRESS	 ---	Cannot initialize Intel XL710 40G interface	2018/12/4 14:47
16	DPDK	doc	dev@dpdk.org	RESOLVED	INVALID	Hacked by Turkish Hacker SpawN #siberordu.biz	2018/2/25 19:43
17	DPDK	ethdev	beilei.xing@intel.com	RESOLVED	INVALID	vhost example VLAN offloading not working on igb tx	2018/11/30 14:35
20	DPDK	core	anatoly.burakov@intel.com	RESOLVED	FIXED	Undefined behavior caused by NUMA function in eal_memory	2018/10/25 14:57
21	DPDK	ethdev	konstantin.ananyev@intel.com	RESOLVED	WONTFIX	Ixgbe driver changes FCTRL without first disabling RXCTRL.RXEN	2018/10/18 9:40
22	DPDK	ethdev	konstantin.ananyev@intel.com	RESOLVED	WONTFIX	Ixgbe driver sets RDRXCTL with the wrong RSCACKC and FCOE_WRFIX values	2018/10/18 9:39
25	DPDK	ethdev	konstantin.ananyev@intel.com	CONFIRMED	 ---	Ixgbe driver sets TDH register after TXDCTL.ENABLE is set	2018/11/16 8:34
26	DPDK	ethdev	konstantin.ananyev@intel.com	CONFIRMED	 ---	Ixgbe driver does not ensure FWSM firmware mode is valid before using it	2019/10/3 5:52
28	DPDK	eventdev	pbhagavatula@caviumnetworks.com	RESOLVED	FIXED	event/octeontx: snprintf() overflow	2018/4/25 16:53
29	DPDK	ethdev	keith.wiles@intel.com	CONFIRMED	 ---	pktgen hangs when it tries to send packets through libvirt driver, works for all other drivers	2019/6/26 15:43
31	DPDK	core	bruce.richardson@intel.com	RESOLVED	FIXED	Does not compile with musl libc: lib/librte_eal/linuxapp/eal/eal_memory.c	2020/4/26 2:46
32	DPDK	mk	dev@dpdk.org	CONFIRMED	 ---	Does not cross-compile: buildtools/check-experimental-syms.sh assumes `objdump`	2020/3/11 10:47
33	DPDK	core	bruce.richardson@intel.com	RESOLVED	FIXED	Does not compile with musl libc: lib/librte_eal/linuxapp/eal/eal_hugepage_info.c	2020/4/26 2:47
34	DPDK	core	bruce.richardson@intel.com	RESOLVED	FIXED	Does not compile with musl libc: lib/librte_eal/common/eal_common_fbarray.c	2020/4/26 2:47
35	DPDK	ethdev	ferruh.yigit@intel.com	CONFIRMED	 ---	Does not compile with musl libc: drivers/bus/pci/linux/pci_uio.c	2019/6/26 10:20
37	DPDK	ethdev	shreyansh.jain@nxp.com	CONFIRMED	 ---	DPAA / FSLMC do not compile on the musl libc	2018/5/4 10:04
38	DPDK	ethdev	rahul.lakkireddy@chelsio.com	CONFIRMED	 ---	Does not compile with musl libc: drivers/net/cxgbe/base/common.h	2018/7/15 6:33
39	DPDK	ethdev	hyonkim@cisco.com	RESOLVED	FIXED	dpdk/drivers/net/enic/base/vnic_devcmd.h does not compile on musl libc because of type `u_int32_t`	2018/10/2 10:34
40	DPDK	ethdev	dev@dpdk.org	RESOLVED	FIXED	drivers/net/nfp/nfpcore/nfp-common/nfp_platform.h: does not compile with musl because it uses an internal glibc header	2019/10/3 5:52
41	DPDK	testpmd	dev@dpdk.org	RESOLVED	FIXED	testpmd failed with net_failsafe error	2018/5/10 19:16
43	DPDK	ethdev	dev@dpdk.org	CONFIRMED	 ---	"rte_eth_tx_queue_setup" will be failed if argument "tx_conf" not specified	2020/3/3 13:16
44	DPDK	examples	pablo.de.lara.guarch@intel.com	RESOLVED	FIXED	examples/l2fwd-crypto : Wrong data length in case of AEAD ciphers	2018/7/17 10:14
45	DPDK	other	thomas@monjalon.net	RESOLVED	WONTFIX	Test compilation fails at 2nd iteration after running resource_autotest	2020/6/18 22:37
47	DPDK	other	reshma.pattan@intel.com	RESOLVED	WONTFIX	Mempool performance autotest: Fail [Timeout]	2018/9/14 12:26
48	DPDK	vhost/virtio	maxime.coquelin@redhat.com	CONFIRMED	 ---	Unexpected performance regression since CVE-2018-1059 fix with vector path	2018/9/12 10:48
50	DPDK	core	anatoly.burakov@intel.com	RESOLVED	FIXED	Secondary process launch is unreliable	2018/11/20 20:29
51	DPDK	other	thomas@monjalon.net	CONFIRMED	 ---	make coverage aborts with core dump	2018/7/19 21:33
57	DPDK	ethdev	pablo.de.lara.guarch@intel.com	RESOLVED	FIXED	ixgbe crash on detach when no VF is created	2018/7/10 0:22
58	DPDK	core	ferruh.yigit@intel.com	RESOLVED	FIXED	cppcheck static analyzer warnings	2020/4/26 2:46
61	DPDK	core	erik.g.carrillo@intel.com	RESOLVED	FIXED	build fails when shared libs enabled and optimization turned off	2018/8/29 20:14
62	DPDK	other	shreyansh.jain@nxp.com	RESOLVED	WONTFIX	Rawdev autotest fails	2018/7/17 13:49
64	DPDK	testpmd	pablo.de.lara.guarch@intel.com	IN_PROGRESS	 ---	Bound_promisc_opt:After the confounding mode is turned off, the port can receive data.	2018/10/1 11:37
67	DPDK	examples	bruce.richardson@intel.com	RESOLVED	INVALID	multi_process/l2fwd_fork failed to compile	2018/11/29 15:39
68	DPDK	vhost/virtio	dev@dpdk.org	RESOLVED	INVALID	virt	2018/7/19 21:31
69	DPDK	ethdev	konstantin.ananyev@intel.com	RESOLVED	FIXED	Intel x550 SFP+ fails to update link state	2020/4/26 2:47
70	DPDK	ethdev	meijuanx.zhao@intel.com	RESOLVED	FIXED	freebsd build dpdk18.08-rc1 issue	2018/8/3 10:10
71	DPDK	ethdev	pablo.de.lara.guarch@intel.com	RESOLVED	FIXED	suse build dpdk 18.08-rc1 issue	2020/4/26 2:47
72	DPDK	core	dev@dpdk.org	RESOLVED	INVALID	Unable to install dpdk on arm64	2018/7/18 10:00
73	DPDK	other	john.mcnamara@intel.com	CONFIRMED	 ---	Secondary processes can not set up ports: document limitation and return error in appropriate functions	2018/10/8 15:13
74	DPDK	ethdev	beilei.xing@intel.com	CONFIRMED	 ---	PMD: i40e_dcb_init_configure(): default dcb config fails. err = -53, aq_err = 3	2018/10/22 9:37
75	DPDK	core	ferruh.yigit@intel.com	RESOLVED	WONTFIX	16.11 compile fail on RHEL 6.9	2019/6/26 10:04
76	DPDK	core	anatoly.burakov@intel.com	RESOLVED	FIXED	2MB hugepages with IOMMU and passthrough not working	2018/11/16 15:19
79	DPDK	other	konstantin.ananyev@intel.com	RESOLVED	FIXED	ACL doesn't match a rule with a first `TYPE_MASK` field with low mask when there's a large number of rules	2018/9/26 16:57
81	DPDK	vhost/virtio	maxime.coquelin@redhat.com	RESOLVED	FIXED	Use of rte_memseg_contig_walk in vhost_kernel.c causes deadlock	2020/4/26 2:47
83	DPDK	ethdev	dev@dpdk.org	CONFIRMED	 ---	For RSS flow actions, e1000_ethdev.h uses IGB_MAX_RX_QUEUE_NUM instead of IGB_MAX_RX_QUEUE_NUM_82576	2018/9/30 3:08
92	DPDK	ethdev	qi.z.zhang@intel.com	CONFIRMED	 ---	i40e RX capabilities include scatter/gather on VF, but not on PF	2018/9/30 3:04
94	DPDK	other	dev@dpdk.org	RESOLVED	INVALID	librte_acl  library: First field in the rule definition can not be other types	2018/9/30 8:16
95	DPDK	core	anatoly.burakov@intel.com	RESOLVED	FIXED	eal/memory: testpmd failed to start with --socket-mem >  16384 with 2MB huge pages and with memory hotplug	2019/4/15 17:20
96	DPDK	ethdev	viacheslavo@mellanox.com	RESOLVED	FIXED	mlx5: TX error for multi-seg packet where first segment has 14~18 bytes	2020/5/12 15:52
98	DPDK	cryptodev	declan.doherty@intel.com	RESOLVED	FIXED	wrongly assignment of digest_len	2019/1/9 13:03
99	DPDK	ethdev	dev@dpdk.org	CONFIRMED	 ---	axgbe driver does not support 1G Copper 1000BASE-T SFPs (Unsupported AN_CL37)	2018/10/31 6:44
102	DPDK	core	alejandro.lucero@netronome.com	RESOLVED	FIXED	IOVA mode causes deadlock	2018/11/8 12:45
103	DPDK	testpmd	alejandro.lucero@netronome.com	RESOLVED	FIXED	Testpmd with ixgbe device assignment doesn't work	2018/11/8 12:46
105	DPDK	cryptodev	dev@dpdk.org	RESOLVED	FIXED	Cannot create crypto_openssl after vdev_uninit	2019/9/12 18:42
107	DPDK	ethdev	rasland@nvidia.com	RESOLVED	INVALID	Cannot set rte_flow QUEUE action for VF representor	2019/10/3 5:52
108	DPDK	ethdev	anatoly.burakov@intel.com	RESOLVED	FIXED	There should be a NULL pointer check about the internal_config.hugefile_prefix	2019/2/22 17:15
111	DPDK	ethdev	gaetan.rivet@6wind.com	UNCONFIRMED	 ---	There maybe some risks to printf  the addr of the map page	2018/12/5 8:17
112	DPDK	other	anandashish92@gmail.com	CONFIRMED	 ---	dpdk-18.05 not allowing to create bond interface with name "lan_bond"	2019/1/17 22:21
113	DPDK	other	dev@dpdk.org	CONFIRMED	 ---	pktgen -s option send pcap traffic once	2018/12/1 7:16
117	DPDK	core	anatoly.burakov@intel.com	RESOLVED	INVALID	in case of malloc_elem_alloc should we increment alloc_count (heap->alloc_count++)?	2018/12/5 17:20
118	DPDK	doc	dev@dpdk.org	CONFIRMED	 ---	conflicting information for 'Running DPDK Applications Without Root Privileges'	2018/12/10 11:35
119	DPDK	ethdev	dev@dpdk.org	RESOLVED	INVALID	I210 Gigabit is returning with -22 when vfio-pci is used for bind	2018/12/6 17:07
120	DPDK	core	dev@dpdk.org	RESOLVED	WONTFIX	secondary fails failure without option '--legacy-mem'	2018/12/6 15:43
121	DPDK	ethdev	konstantin.ananyev@intel.com	CONFIRMED	 ---	In ixgbe_tx_free_bufs function the variable free on stack is used before initialization	2019/1/9 16:07
139	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	When measurements throws a 404, the dashboard throws a 500	2018/12/10 19:52
142	lab	UNH infra	ci@dpdk.org	RESOLVED	WONTFIX	Creating a user requires restarting sssd on leaf node for them to log in	2019/11/19 21:46
162	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	Private files can't be downloaded via CLI easily	2018/12/10 20:19
164	DPDK	ethdev	dev@dpdk.org	CONFIRMED	 ---	configure rx queue for JUMBO frame returns warning as offload is 0x0, but eth_pcap_rx_jumbo is present	2018/12/11 17:21
165	DPDK	other	arnon@qwilt.com	RESOLVED	FIXED	checkpatches.sh doesn't detect rte_exit() / rte_panic() instances	2020/4/26 2:46
166	lab	dashboard	dpdklab@iol.unh.edu	RESOLVED	FIXED	patch may fail to apply when it targets different sub-tree other than main tree	2019/11/19 17:32
174	DPDK	core	anatoly.burakov@intel.com	RESOLVED	FIXED	rte_vfio_dma_map issue in secondary process	2019/2/22 17:19
175	DPDK	other	dev@dpdk.org	RESOLVED	INVALID	DPDK on Azure using `intel-go/nff-go` fails using `hv_netvsc` driver	2020/5/12 15:54
176	DPDK	core	dev@dpdk.org	CONFIRMED	 ---	secondary process cannot execute  iommu	2018/12/28 6:40
177	DPDK	ethdev	dev@dpdk.org	RESOLVED	INVALID	binding i40e with uio_pci_generic fails for DPDK 19.02.0-rc1	2019/1/10 3:41
178	DPDK	examples	dev@dpdk.org	RESOLVED	WONTFIX	l2fwd application does not work with option '-q'	2019/5/6 6:59
182	DPDK	doc	dev@dpdk.org	RESOLVED	FIXED	make doc-guides-pdf fails with error 'make[3]: latexmk: Command not found'	2019/5/6 6:32
183	DPDK	other	dev@dpdk.org	CONFIRMED	 ---	Problem using cloned rte_mbuf buffers with KNI interface	2019/9/10 21:24
184	lab	job scripts	blo@iol.unh.edu	CONFIRMED	 ---	Update report emails for GA performance runs	2020/6/30 20:25
185	DPDK	core	dev@dpdk.org	CONFIRMED	 ---	PVP zero-loss performance degradation without --legacy-mem	2019/1/10 12:27
186	DPDK	core	maxime.coquelin@redhat.com	CONFIRMED	 ---	Huge testpmd startup time without --legacy-mem option	2019/3/11 17:33
187	DPDK	core	dev@dpdk.org	CONFIRMED	 ---	Merge linux and bsd eal_thread.c which are same	2020/6/10 8:19
189	DPDK	eventdev	jerinjacobk@gmail.com	CONFIRMED	 ---	RTE Timer Adapter Use After Free	2019/7/31 6:10
190	lab	dashboard	ci@dpdk.org	RESOLVED	WONTFIX	Investigate some apply errors with unclear root cause	2019/1/16 20:20
192	DPDK	mk	thomas@monjalon.net	CONFIRMED	 ---	construct function miss for  build with static library	2019/1/18 3:28
195	lab	dashboard	ci@dpdk.org	RESOLVED	FIXED	"Applied on" commit id and "baseline" commit id issues	2019/2/5 19:00
197	lab	dashboard	ci@dpdk.org	RESOLVED	FIXED	can we display deeper history	2019/2/11 9:48
198	lab	job scripts	ci@dpdk.org	RESOLVED	FIXED	sent patchwork reports on build failures too	2019/1/30 15:04
200	dpdk-burst-replay	doc	jonathan.ribas@fraudbuster.mobi	RESOLVED	FIXED	mismatch in documentation and makefile	2019/2/1 9:35
201	dpdk-burst-replay	app	vipin.varghese@intel.com	RESOLVED	INVALID	main.c uses 'struct pcap_ctx'	2019/4/1 6:59
202	dpdk-burst-replay	app	jonathan.ribas@fraudbuster.mobi	RESOLVED	FIXED	in function check_needed_memory for dpdk->mbuf_sz does it get aligned?	2019/5/3 17:10
203	dpdk-burst-replay	app	jonathan.ribas@fraudbuster.mobi	RESOLVED	FIXED	if user passes numa id, why is pcicards under the same not populated	2019/5/3 17:21
205	DPDK	other	dev@dpdk.org	RESOLVED	FIXED	make test fails with DPDK 19.02 (KeyError: 'Command')	2019/3/9 12:32
206	lab	UNH infra	dpdklab@iol.unh.edu	RESOLVED	FIXED	Set up systems for OVS ovs_perf testing at UNH	2019/11/19 20:10
207	lab	dashboard	ci@dpdk.org	RESOLVED	WORKSFORME	JS homepage TypeError with Chrome	2019/11/19 17:28
208	lab	dashboard	ci@dpdk.org	RESOLVED	FIXED	Some “Not Applicable” items looks wrong	2019/2/15 18:34
209	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	Main tree is not up to date when patch sent, which cause merge error	2019/2/12 18:10
211	lab	dashboard	ci@dpdk.org	RESOLVED	INVALID	Invalid link for "applied on" sha1	2019/2/13 17:13
212	lab	job scripts	ferruh.yigit@intel.com	RESOLVED	FIXED	add a new testcase: autotest, which runs a defined set of unit tests	2020/7/1 20:06
213	DPDK	core	ferruh.yigit@intel.com	RESOLVED	WONTFIX	Fix the problem of KNI device (Net Stack kthread) keeps dropping packets (stats.tx_dropped++) and TX thread logs "KNI: Out of memory"	2019/4/25 19:34
214	DPDK	core	anatoly.burakov@intel.com	RESOLVED	INVALID	There should be a NULL pointer check about the  malloc_elem_alloc	2019/2/25 12:57
215	DPDK	core	dev@dpdk.org	RESOLVED	INVALID	IPC socket of 2 primary processes may conflict	2019/2/26 17:19
217	DPDK	ethdev	debugnetiq1@yahoo.ca	RESOLVED	INVALID	DPDK-19.02 will not build when MLX4/MLX5 is enabled. In comparison DPDK 18-11 builds fine	2019/7/11 10:16
218	DPDK	ethdev	debugnetiq1@yahoo.ca	RESOLVED	FIXED	DPDK 18.02 (stable) won't compile when MLX4/MLX5 support is enabled	2019/7/11 10:21
219	DPDK	ethdev	debugnetiq1@yahoo.ca	RESOLVED	INVALID	DPDK 18.11 builds with MLX4/MLX5 support but testpmd won't recognize the device	2019/7/11 9:48
221	DPDK	examples	ferruh.yigit@intel.com	RESOLVED	WONTFIX	How to classifier ipv6 packets with  flow classification library	2019/4/8 15:31
222	DPDK	other	reshma.pattan@intel.com	RESOLVED	FIXED	When setting CONFIG_RTE_LIBRTE_PDUMP=n, build fails with "undefined reference to `test_pdump'"	2020/2/10 11:38
223	lab	job scripts	ci@dpdk.org	RESOLVED	FIXED	Using wrong/old commit id of the tree to apply the patch	2019/11/19 18:07
224	lab	job scripts	ci@dpdk.org	RESOLVED	WONTFIX	Possibly wrong regression report	2020/4/21 16:01
225	DPDK	testpmd	dev@dpdk.org	RESOLVED	FIXED	ethdev API for firmware version request is not tested	2020/4/26 2:18
227	DPDK	ethdev	dev@dpdk.org	CONFIRMED	 ---	Flow control mode on mac Intel Corporation I350 Gigabit Network Connection (rev 01) issues	2019/3/17 12:24
229	lab	job scripts	ci@dpdk.org	RESOLVED	DUPLICATE	lab scripts should be upstreamed to dpdk-ci repository	2020/4/21 15:57
230	lab	job scripts	ci@dpdk.org	CONFIRMED	 ---	publish a tutorial about how to deploy a DPDK lab	2019/3/26 15:40
231	lab	job scripts	ferruh.yigit@intel.com	RESOLVED	WONTFIX	when a sub-tree used as base, two different commit id displayed in logs	2020/7/1 15:00
232	lab	dashboard	ci@dpdk.org	RESOLVED	FIXED	Should we make it more visible when at least one of the platforms failed?	2019/6/26 16:21
234	DPDK	core	anatoly.burakov@intel.com	RESOLVED	INVALID	dma remapping failed with errno 22 when use "--no-huge"	2019/4/24 12:47
235	DPDK	doc	vipin.varghese@intel.com	RESOLVED	FIXED	References section for Algorithms for Routing Lookups and Packet Classification is not working	2019/10/3 5:52
237	DPDK	examples	dev@dpdk.org	RESOLVED	FIXED	Running test-build.sh Fails on ppc_64 fails due to hard-coded requirement for IXGBE_PMD in examples/vm_power_manager	2020/4/26 2:46
239	DPDK	examples	dev@dpdk.org	CONFIRMED	 ---	ipsec-secgw fails to initialize when librte_ipsec is enabled	2019/4/10 19:00
242	DPDK	core	olivier.matz@6wind.com	RESOLVED	INVALID	repeat to calling 'rte_pktmbuf_free' function, make the mempool exist the same 'rte_mbuf' obj;	2019/4/9 12:56
243	lab	UNH infra	ci@dpdk.org	RESOLVED	FIXED	DPDK Compilation Coverage	2020/4/21 16:25
244	lab	UNH infra	ci@dpdk.org	RESOLVED	FIXED	Running Unit Testing	2020/1/14 18:59
249	DPDK	core	ferruh.yigit@intel.com	RESOLVED	FIXED	kni cause a kernel crash on avx512 supported platform with gcc 8.3.1	2019/6/26 10:08
250	DPDK	ethdev	martin.weiser@allegro-packets.com	RESOLVED	FIXED	i40e: rte_eth_link_get_nowait() on X722 returns wrong link_speed value 20000 instead of 10000	2019/5/7 8:41
251	dpdk-burst-replay	app	jonathan.ribas@fraudbuster.mobi	RESOLVED	FIXED	Infinite mode not working	2019/4/11 9:17
252	DPDK	ethdev	keith.wiles@intel.com	RESOLVED	FIXED	Possible access to invalid FDs in rte_eth_tap	2020/4/26 2:46
253	DPDK	other	dev@dpdk.org	RESOLVED	FIXED	Unable to run DPDK test with "make test" command	2020/4/26 2:45
255	DPDK	ethdev	dev@dpdk.org	RESOLVED	INVALID	Mbuf leak when rte_port_ethdev_writer_tx_bulk is called with more than 32 packets	2019/5/22 21:49
257	DPDK	core	anatoly.burakov@intel.com	CONFIRMED	 ---	ipc: rte_mp_request_sync return 0 on error.	2019/5/1 6:06
260	DPDK	other	pablo.de.lara.guarch@intel.com	RESOLVED	DUPLICATE	DPDK 18.11 lockfree 哈希表的 bug	2019/5/5 3:32
261	DPDK	other	dharmik.thakkar@arm.com	RESOLVED	FIXED	bug on lock-free hash API rte_hash_free_key_with_position	2019/5/16 18:35
262	DPDK	vhost/virtio	maxime.coquelin@redhat.com	RESOLVED	FIXED	Error: Invalid memory for eth_virtio_dev_init()	2019/5/2 9:31
263	DPDK	ethdev	konstantin.ananyev@intel.com	CONFIRMED	 ---	ixgbe does not support 10GBASE-T copper SFP+	2019/5/1 20:23
264	DPDK	ethdev	yskoh@mellanox.com	RESOLVED	FIXED	ring_pmd fails to properly release used port on 17.11 branch	2020/6/18 22:16
266	DPDK	other	security@dpdk.org	RESOLVED	FIXED	CVE-2019-14818	2020/5/18 14:03
267	DPDK	other	security@dpdk.org	RESOLVED	FIXED	librte_vhost: Interger overflow in vhost_user_set_log_base()	2020/5/18 16:34
268	DPDK	other	security@dpdk.org	RESOLVED	FIXED	librte_vhost: Integer truncation in vhost_user_check_and_alloc_queue_pair()	2020/5/18 16:35
269	DPDK	other	security@dpdk.org	RESOLVED	FIXED	librte_vhost: Missing inputs validation in Vhost-crypto	2020/5/18 16:36
270	DPDK	other	security@dpdk.org	RESOLVED	FIXED	librte_vhost: Malicious guest could cause segfault by sending invalid Virtio descriptor	2020/5/18 16:37
271	DPDK	other	security@dpdk.org	RESOLVED	FIXED	librte_vhost: VHOST_USER_GET_INFLIGHT_FD message flooding to result in a DOS	2020/5/18 16:38
276	DPDK	core	mattias.ronnblom@ericsson.com	RESOLVED	FIXED	rte_rand() bit 31 and 63 are always zero	2019/6/30 7:17
277	DPDK	eventdev	nikhilprao@gmail.com	RESOLVED	FIXED	eventdev sw rx adapter enqueue buffer may store packets indefinitely	2020/4/26 2:46
279	DPDK	examples	ferruh.yigit@intel.com	RESOLVED	FIXED	Unaligned memory access when reading ipv6 header	2020/4/26 2:45
281	DPDK	testpmd	dev@dpdk.org	RESOLVED	INVALID	BPF: Linking error in librte_bpf	2019/5/20 17:03
282	DPDK	core	dev@dpdk.org	RESOLVED	FIXED	Fix missing headers in FreeBSD CURRENT build	2019/7/12 18:07
283	DPDK	other	michel@digirati.com.br	RESOLVED	FIXED	BPF: array ins_chk is missing an entry	2019/7/15 21:01
286	lab	job scripts	ci@dpdk.org	RESOLVED	FIXED	Run clang compilation on windows	2020/4/21 16:22
287	DPDK	ethdev	stephen@networkplumber.org	IN_PROGRESS	 ---	netvsc PMD/dpdk/azure: Driver lockup with multi-queue configuration	2020/5/12 15:59
289	DPDK	ethdev	dev@dpdk.org	RESOLVED	FIXED	mlx5: 100G interface capability not recognized	2019/7/11 10:23
290	DPDK	vhost/virtio	maxime.coquelin@redhat.com	RESOLVED	FIXED	RX packets in Virtio are corrupted in case of split to several mbufs	2019/6/6 11:30
291	DPDK	ethdev	qi.z.zhang@intel.com	CONFIRMED	 ---	FM10K dpdk driver - memory leak with KNI interface - interface up/down	2019/7/30 12:35
293	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	Can we add a filter for status, to be able to see only some patches with specific status	2019/6/26 9:55
294	DPDK	ethdev	dev@dpdk.org	RESOLVED	DUPLICATE	max_rx_pkt_len issues with i40e dpdk SRIOV driver (net_i40e_vf).	2019/9/12 7:07
295	DPDK	ethdev	dev@dpdk.org	RESOLVED	DUPLICATE	max_rx_pkt_len issues with i40e dpdk SRIOV driver net_i40e_vf.	2019/9/12 7:07
298	DPDK	other	konstantin.ananyev@intel.com	RESOLVED	FIXED	BPF: eval_call() is messing bounds of return types different of RTE_BPF_ARG_RAW	2019/7/15 20:50
299	DPDK	ethdev	xiao.zhang@intel.com	RESOLVED	FIXED	Intel i219 reset hang	2019/7/24 4:32
300	DPDK	ethdev	xiao.zhang@intel.com	RESOLVED	FIXED	Intel i219 buffer overrun errata fix	2019/7/19 8:16
302	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	Google's Webcache version of the website does not work	2019/7/1 22:26
303	DPDK	meson	ci@dpdk.org	RESOLVED	FIXED	meson-0.51.0 isn't building docs	2020/4/26 2:45
307	DPDK	other	ido@cgstowernetworks.com	RESOLVED	FIXED	ACL (librte_acl) field of type RANGE and size U32 is not working properly	2020/4/26 2:40
308	DPDK	ethdev	donald_lee@trendmicro.com	RESOLVED	FIXED	Tap driver may leave some pending frame there but not retrieve	2019/11/12 11:09
316	DPDK	other	david.hunt@intel.com	RESOLVED	FIXED	livelock causes librte_distributor unit test to hang	2019/7/29 23:27
320	DPDK	ethdev	matan@mellanox.com	RESOLVED	FIXED	mlx4: info get fails in secondary process	2020/4/26 2:45
321	DPDK	examples	konstantin.ananyev@intel.com	RESOLVED	FIXED	BPF: Errors compiling example BPF programs	2020/4/26 2:45
322	DPDK	core	david.marchand@redhat.com	RESOLVED	FIXED	eal: ctrl thread calculation assumes 1:1 mapping between cpu and lcore id	2019/7/31 10:22
323	DPDK	core	dev@dpdk.org	RESOLVED	DUPLICATE	eal: ctrl thread calculation assumes 1:1 mapping between cpu and lcore id	2019/7/29 15:52
324	DPDK	examples	stephen@networkplumber.org	RESOLVED	FIXED	eal/cmdline_autotest failed	2020/3/17 0:52
334	DPDK	ethdev	viacheslavo@mellanox.com	RESOLVED	INVALID	ConnectX-4/mlx5 crashes under high load in rxq_cq_decompress_v()	2020/6/23 14:21
335	DPDK	ethdev	hemant.agrawal@nxp.com	RESOLVED	FIXED	Compilation fails when HEADROOM is 0	2020/4/26 2:45
336	DPDK	other	ullas-d.bhat@hpe.com	CONFIRMED	 ---	Unable to exit DPDK application when running as separate thread.	2019/8/14 16:34
337	DPDK	vhost/virtio	maxime.coquelin@redhat.com	CONFIRMED	 ---	Live migration with dpdk(in host)+vhost-user+dpdk(in guest) fails: Failed to load virtio-net:virtio	2019/9/17 9:44
338	DPDK	core	abhijeet080808@gmail.com	UNCONFIRMED	 ---	IP Reassembly with more 4 packets Segfault	2019/8/15 16:44
339	DPDK	ethdev	abhishek.sachan@altran.com	RESOLVED	FIXED	net/af_packet: af_packet driver is leaving stale socket after device is removed	2020/4/26 2:45
340	DPDK	examples	dev@dpdk.org	RESOLVED	FIXED	Can't build examples in Ubuntu 18 after commit 4131ad5db from 03/07/2019	2019/10/4 17:28
343	DPDK	ethdev	3chas3@gmail.com	UNCONFIRMED	 ---	Couldn't receive LACP PDU when enable dedicated queue	2019/9/4 20:47
344	DPDK	meson	dev@dpdk.org	CONFIRMED	 ---	Broken CPU feature discovery for armv8	2019/9/5 21:32
345	DPDK	other	yipeng1.wang@intel.com	RESOLVED	FIXED	rte_hash returns invalid key if the number of entries is not a power of 2	2019/11/27 15:02
347	DPDK	ethdev	rasland@nvidia.com	CONFIRMED	 ---	TAPPMD frees buffers it fails to send	2020/6/23 14:24
348	DPDK	ethdev	beilei.xing@intel.com	UNCONFIRMED	 ---	i40e: packets greater than 1024B are dropped due to a integer overflow	2019/10/14 10:46
349	DPDK	ethdev	beilei.xing@intel.com	UNCONFIRMED	 ---	i40e/i40evf: Allow bad packets to reach application (SBP)	2019/9/25 10:54
350	DPDK	ethdev	konstantin.ananyev@intel.com	UNCONFIRMED	 ---	ixgbe: incorrect speed capabilities advertised for X553 devices	2019/9/20 13:53
351	DPDK	meson	dev@dpdk.org	RESOLVED	FIXED	When RTE_LIBRTE_PCAP_PMD is enabled RTE_PORT_PCAP is not enabled for rte_port_source_sink.c	2019/10/3 5:53
353	DPDK	core	hemant.agrawal@nxp.com	RESOLVED	FIXED	Missing null checks	2020/4/25 23:00
354	DPDK	ethdev	dev@dpdk.org	UNCONFIRMED	 ---	net/tap can not get rx packet drop stats when packets be dropped in kernel (net/driver/tun.c)	2020/5/13 14:08
357	DPDK	ethdev	dev@dpdk.org	RESOLVED	FIXED	ppc64: i40e not compiling on RHEL7/CentOS7	2020/6/16 12:40
358	DPDK	ethdev	michael.pfeiffer@tu-ilmenau.de	RESOLVED	INVALID	KNI packets dropped on Bluefield SDK	2020/6/23 14:20
359	DPDK	meson	bruce.richardson@intel.com	RESOLVED	WORKSFORME	Makefile calls 'pkg-config --path'	2019/11/6 15:56
360	DPDK	examples	marko.kovacevic@intel.com	RESOLVED	FIXED	FIPS application fails for AES-GCM test vectors with non-zero AAD	2020/3/2 14:42
361	DPDK	ethdev	ferruh.yigit@intel.com	CONFIRMED	 ---	device reset handling with igb_uio	2020/8/5 9:47
362	DPDK	core	xiao.zhang@intel.com	UNCONFIRMED	 ---	rte_pktmbuf_attach_extbuf does not update pkt_len	2019/12/26 13:57
367	DPDK	doc	ajit.khaparde@broadcom.com	RESOLVED	FIXED	extra character in document l2_forward_event.rst	2020/4/26 2:40
368	DPDK	doc	dev@dpdk.org	RESOLVED	DUPLICATE	missing character in document l2_forward_event.rst	2019/11/22 5:22
370	DPDK	core	anatoly.burakov@intel.com	CONFIRMED	 ---	Cannot hotplug VFIO devices if VFIO driver was not loaded at init	2019/11/27 11:19
373	DPDK	ethdev	xiao.zhang@intel.com	UNCONFIRMED	 ---	i40e: TSO breaks for packets larger than 16k	2020/5/28 13:47
374	DPDK	meson	alialnu@mellanox.com	IN_PROGRESS	 ---	Meson build failure due to libibverbs-dev upgrade (version=45mlnx1-1.45101)	2020/6/23 14:24
376	DPDK	testpmd	jerryhao@os.amperecomputing.com	RESOLVED	FIXED	mlx5 / DPDK 19.11 : single core throughput dropped at testpmd (VS DPDK 19.08)	2020/6/23 14:17
377	DPDK	cryptodev	dev@dpdk.org	RESOLVED	FIXED	CRYPTODEV: set_sym_session_private_data() line 489: Set private data for driver 0 not allowed	2020/4/26 2:40
380	DPDK	core	dev@dpdk.org	CONFIRMED	 ---	memory subsystem leaks file descriptors	2020/1/7 11:29
381	DPDK	core	dev@dpdk.org	UNCONFIRMED	 ---	hugepages not detached on cleanup	2020/1/7 11:27
382	DPDK	ethdev	dev@dpdk.org	UNCONFIRMED	 ---	rte_eth: rx/tx callbacks invoked without lock protection	2020/1/10 4:05
383	DPDK	vhost/virtio	eupm90@gmail.com	RESOLVED	FIXED	dpdk virtio_user lack of notifications make vhost_net+napi stops tx buffers	2020/2/6 9:02
384	DPDK	ethdev	dev@dpdk.org	RESOLVED	FIXED	netvsc PMD crashes in secondary process in dev_info_get	2020/3/17 0:58
386	DPDK	core	siddsr@gmail.com	UNCONFIRMED	 ---	Big spike in DPDK process VSZ since release 18.05.1	2020/2/5 20:53
387	DPDK	ethdev	jerin.jacob@caviumnetworks.com	RESOLVED	FIXED	Disabling octeontx in meson leads to meson configure failure	2020/4/26 2:02
388	DPDK	ethdev	qi.z.zhang@intel.com	RESOLVED	FIXED	ixgbe: link state race condition can occur when starting a fiber port	2020/5/12 4:25
390	DPDK	ethdev	matan@mellanox.com	RESOLVED	WONTFIX	netvsc: There are always too many packets in tx-drop queue in testpmd tx-side	2020/3/16 22:43
391	DPDK	other	pierrick.louin@orange.com	UNCONFIRMED	 ---	The dpdk-devbind.py tool crashes if some NIC property contains a unicode character - Patch proposal	2020/2/5 22:15
392	DPDK	examples	dev@dpdk.org	RESOLVED	FIXED	l3fwd fails to run with eventdev	2020/2/7 11:20
394	DPDK	cryptodev	thomas@monjalon.net	RESOLVED	FIXED	Build of librte_cryptodev with GCC 10.0.1 fails	2020/5/7 0:06
395	DPDK	other	dev@dpdk.org	RESOLVED	FIXED	Build of hinic with GCC 10.0.1 fails on aarch64	2020/3/20 13:42
396	DPDK	other	dev@dpdk.org	RESOLVED	FIXED	Build of octeontx2 with GCC 10.0.1 fails on armv7	2020/5/19 11:37
398	DPDK	ethdev	srn@nexatech.fr	RESOLVED	FIXED	MLX5 device won't start with no RX queue	2020/2/21 20:29
399	DPDK	ethdev	konstantin.ananyev@intel.com	UNCONFIRMED	 ---	ixgbe X540 PMD RSS is zero for NFSv3 NULL reply	2020/4/14 21:35
400	DPDK	testpmd	dev@dpdk.org	VERIFIED	FIXED	start testpmd with vmxnet3 can't receive and forward packets	2020/5/12 9:41
401	DPDK	other	olivier.matz@6wind.com	UNCONFIRMED	 ---	unit_tests: mempool_autotest failed with shared mode library	2020/2/21 20:26
402	DPDK	ethdev	wei.zhao1@intel.com	RESOLVED	FIXED	i40e: cannot add rte_flow with ether_type = ARP	2020/4/29 10:12
403	DPDK	ethdev	wei.zhao1@intel.com	RESOLVED	FIXED	i40e: cannot add 2 rte_flows with one matching TCP sport and the other dport	2020/4/29 10:13
404	DPDK	ethdev	wei.zhao1@intel.com	RESOLVED	FIXED	i40e: "i40e_res_pool_free(): Failed to find entry" error when rte_flow are flushed	2020/4/29 10:14
406	DPDK	examples	dev@dpdk.org	UNCONFIRMED	 ---	ethtool doesn't compile if you installed with ninja rather than make	2020/2/24 9:50
409	DPDK	testpmd	viacheslavo@mellanox.com	CONFIRMED	 ---	testpmd sometimes does not correctly show RX-missed on Mellanox NICs	2020/6/23 14:12
410	DPDK	other	ferruh.yigit@intel.com	UNCONFIRMED	 ---	KNI deadlocks when used with Mellanox device	2020/2/26 19:14
411	lab	UNH infra	ci@dpdk.org	RESOLVED	FIXED	Intel performance testing currently down	2020/4/7 15:22
412	lab	UNH infra	ci@dpdk.org	RESOLVED	FIXED	NXP performance testing currently down	2020/4/21 15:12
413	DPDK	core	dev@dpdk.org	RESOLVED	INVALID	rte_ring: capacity was set incorrectly	2020/8/14 12:40
414	DPDK	ethdev	alialnu@mellanox.com	UNCONFIRMED	 ---	mlx5: test/debug_autotest failed when enable CONFIG_RTE_LIBRTE_MLX5_PMD=y	2020/6/18 22:28
415	lab	job scripts	ci@dpdk.org	RESOLVED	FIXED	[dpdk-ci] encoding issue when compiling ovs	2020/3/4 9:05
416	DPDK	ethdev	neruda@netcope.com	RESOLVED	FIXED	nfb build failed - missing rpms?	2020/3/18 9:15
417	DPDK	cryptodev	pablo.de.lara.guarch@intel.com	RESOLVED	FIXED	CentOS7/RHEL7 nasm version too old for intel-ipsec-mb	2020/5/27 12:20
419	DPDK	other	thomas@monjalon.net	UNCONFIRMED	 ---	usertools/dpdk-setup.sh crashes on non-alphanumeric input	2020/3/20 19:12
421	DPDK	core	thomas@monjalon.net	RESOLVED	FIXED	gcc 10.0.1 stringops-overflow warnings	2020/5/7 0:06
422	DPDK	doc	john.mcnamara@intel.com	RESOLVED	FIXED	Typing error in patches.rst in doc/guides/contributing at line 177	2020/5/27 20:32
424	DPDK	other	drc@linux.vnet.ibm.com	RESOLVED	FIXED	malloc_autotest fails with message "Unexpected - ptr4 != ptr3"	2020/4/26 2:40
430	DPDK	ethdev	beilei.xing@intel.com	RESOLVED	INVALID	i40e has wrong byte order in rte_flow_item_eth (ethdev)	2020/3/31 6:15
432	DPDK	other	john.mcnamara@intel.com	CONFIRMED	 ---	Entering Non-numeric value for Setup hugepage mappings,  dpdk-setup.sh still goes to create_mnt_huge function and prints misleading info	2020/4/9 7:21
434	DPDK	testpmd	dev@dpdk.org	UNCONFIRMED	 ---	bps calculation does not fit in 64 bit	2020/4/22 19:31
436	DPDK	ethdev	jgrajcia@cisco.com	CONFIRMED	 ---	rte_eth_promiscuous_enable fails for memif on l2fwd	2020/4/28 4:18
437	DPDK	ethdev	dev@dpdk.org	CONFIRMED	 ---	memif pmd, does not cleanup on primary application restart	2020/5/13 15:43
438	DPDK	ethdev	dev@dpdk.org	UNCONFIRMED	 ---	memif sock does not honor file-prefix	2020/7/28 11:22
440	DPDK	ethdev	mohsinshaikh@niometrics.com	RESOLVED	FIXED	net/mlx5: Read of "out_of_buffer" using fopen/fscanf/fclose causing TLB shootdowns due to mmap/munmap	2020/4/25 4:05
444	DPDK	core	stephen@networkplumber.org	IN_PROGRESS	 ---	DPDK fails to receive packets in Azure when using more than 3 transmit queues	2020/4/16 18:56
445	SPP	cli	oda@valinux.co.jp	RESOLVED	FIXED	pipe can not be added by CLI if the spp_primary does not have the forwarder	2020/6/9 7:28
446	DPDK	core	dev@dpdk.org	RESOLVED	FIXED	rte_lcore_index(-1) returns invalid data for non DPDK thread.	2020/7/9 9:01
450	DPDK	testpmd	honnappa.nagarahalli@arm.com	RESOLVED	FIXED	wrong report for cycles/pkt or pps	2020/7/9 9:01
452	DPDK	core	yipeng1.wang@intel.com	RESOLVED	INVALID	cuckoo hash gcc10 warning	2020/4/23 21:47
456	SPP	ctl	yasufum.o@gmail.com	CONFIRMED	 ---	spp with python2 has error	2020/4/24 4:18
458	DPDK	meson	dev@dpdk.org	RESOLVED	FIXED	Windows server 2019 UNH CI fails	2020/4/22 10:26
460	lab	UNH infra	ci@dpdk.org	RESOLVED	FIXED	Broadcom performance testing being setup	2020/5/28 23:15
462	DPDK	other	dev@dpdk.org	VERIFIED	FIXED	command kvargs_autotest excute failed on freebsd with gcc and clang	2020/5/12 8:25
464	DPDK	other	l.wojciechow@partner.samsung.com	RESOLVED	FIXED	In test app running mbuf_autotest after running service_autotest causes terminal to get stuck	2020/7/9 9:01
465	DPDK	testpmd	dev@dpdk.org	RESOLVED	INVALID	app/test compile failed with gcc and clang	2020/5/13 10:41
466	lab	UNH infra	ci@dpdk.org	RESOLVED	FIXED	Mellanox build errors occur randomly	2020/6/11 17:27
467	lab	UNH infra	ci@dpdk.org	RESOLVED	FIXED	Intel baseline pulling incorrect numbers	2020/4/30 16:07
469	DPDK	cryptodev	hemant.agrawal@nxp.com	RESOLVED	FIXED	crypto/dpaa: gcc 10 linker fails for fno-common	2020/5/19 11:37
470	DPDK	ethdev	dev@dpdk.org	UNCONFIRMED	 ---	vmxnet3 pmd cannot received icmp6 ns packet	2020/5/11 9:31
475	DPDK	other	dev@dpdk.org	UNCONFIRMED	 ---	failure in `EAL flags autotest`	2020/5/14 4:34
477	DPDK	doc	dev@dpdk.org	RESOLVED	FIXED	Typing error in index.rst of doc/guides/eventdevs at line 8	2020/5/23 7:46
480	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	No data points in Grafana dashboard	2020/5/19 15:59
481	DPDK	other	ferruh.yigit@intel.com	RESOLVED	DUPLICATE	[dpdk-20.05]kni/ifconfig:Failed to change vEth0_0 MTU on powerville and springville	2020/5/21 10:16
482	DPDK	other	ferruh.yigit@intel.com	RESOLVED	FIXED	[dpdk-20.05]kni/ifconfig:Failed to change vEth0_0 MTU on powerville and springville	2020/5/25 7:15
483	DPDK	ethdev	iobeyond@126.com	UNCONFIRMED	 ---	Bond 8023ad lacp handshake sometimes fail	2020/5/31 4:37
487	DPDK	core	dev@dpdk.org	UNCONFIRMED	 ---	Worse performance with DPDK driver when MTU is set to 2022 or less	2020/6/10 22:41
490	lab	UNH infra	blo@iol.unh.edu	CONFIRMED	 ---	Make scripts capture trex and dts version on test	2020/6/30 22:26
491	DPDK	other	dev@dpdk.org	UNCONFIRMED	 ---	Timers synchronously resetting or stopping other timers as part of their callback can cause hangs	2020/7/29 10:11
493	lab	Intel Lab	zhaoyan.chen@intel.com	RESOLVED	FIXED	Failures reported by Intel CI for series 10551	2020/7/16 15:27
494	DPDK	core	dev@dpdk.org	UNCONFIRMED	 ---	rte_pktmbuf_pool_create returns EINVAL instead of ENOMEM in rte_errno when not enough huge pages memory	2020/7/2 7:50
497	lab	job scripts	lylavoie@iol.unh.edu	RESOLVED	FIXED	Reporting format per patchset	2020/8/18 22:43
498	DPDK	meson	beilei.xing@intel.com	RESOLVED	FIXED	can not start testpmd after use meson/ninja build 32-bit app on x86 system	2020/7/6 17:09
504	lab	UNH infra	alialnu@mellanox.com	CONFIRMED	 ---	Upgrade DTS version on Mellanox system	2020/7/9 15:40
506	DPDK	ethdev	frederic.coiffier@6cure.com	RESOLVED	FIXED	i40e: Fix for rte_eth_dev_get_module_eeprom()	2020/7/16 5:41
507	DPDK	vhost/virtio	dev@dpdk.org	IN_PROGRESS	 ---	virtio perf decrease and interrupt abnormal	2020/7/22 17:14
508	lab	Travis CI	aconole@bytheb.org	IN_PROGRESS	 ---	Missing Reports from Travis CI	2020/7/16 15:16
509	DPDK	mk	ajit.khaparde@broadcom.com	RESOLVED	FIXED	[dpdk-20.08] make failed with cflags -O1	2020/8/3 14:09
510	DPDK	vhost/virtio	dev@dpdk.org	UNCONFIRMED	 ---	Virtio driver breaks all apps which use ETH_MQ_RX_RSS	2020/7/17 22:45
512	DPDK	cryptodev	roy.fan.zhang@intel.com	UNCONFIRMED	 ---	[dpdk-20.08]Crypto:fips_cryptodev test failed for TDES on aesni_mb, openssl and qat PMD	2020/8/7 5:06
513	DPDK	testpmd	dev@dpdk.org	RESOLVED	DUPLICATE	[dpdk-20.08]tx_preparation/tx_preparation:IPV6/TCP packets TSO checksum incorrect	2020/7/23 7:26
514	DPDK	testpmd	arybchenko@solarflare.com	RESOLVED	FIXED	[dpdk-20.08]tx_preparation/tx_preparation:IPV6/TCP packets TSO checksum incorrect	2020/7/29 4:46
516	DPDK	ethdev	jia.guo@intel.com	UNCONFIRMED	 ---	Multiple Intel Ethernet drivers do not conform to rte_eth_rx_burst() API	2020/8/3 7:58
519	DPDK	meson	shahafs@mellanox.com	RESOLVED	FIXED	DPDK 20.08-rc3 meson build fails with MLNX_OFED_LINUX-5.1-0.6.6.0	2020/8/4 14:38
520	DPDK	ethdev	jia.guo@intel.com	UNCONFIRMED	 ---	i40e: UDP PTPv2 packets sent to port 320 not timestamped	2020/8/3 19:32
521	DPDK	ethdev	jia.guo@intel.com	UNCONFIRMED	 ---	i40e: incorrect byte counters	2020/8/8 0:16
522	DPDK	ethdev	mk@semihalf.com	UNCONFIRMED	 ---	Performance degradation on AWS ena driver	2020/8/17 17:47
523	DPDK	vhost/virtio	dev@dpdk.org	UNCONFIRMED	 ---	vhost iotlb cache incorrectly assumes to be single consumer	2020/8/10 15:56
524	DPDK	ethdev	dev@dpdk.org	UNCONFIRMED	 ---	mlx5 pmd  crash, mlx5_rxte_vec_sse.h# rxq_cq_decompress_v	2020/8/13 13:04
525	lab	Intel Lab	ci@dpdk.org	UNCONFIRMED	 ---	Change CI scripts due to branch name changed from "master" to "main"	2020/8/18 7:15
526	DPDK	ethdev	dev@dpdk.org	UNCONFIRMED	 ---	ixgbe: X550 flow type ETH / VLAN / RAW not supported	2020/8/14 12:06
527	lab	UNH infra	blo@iol.unh.edu	RESOLVED	FIXED	Update SPDK branch	2020/8/18 22:44
11	DPDK	cryptodev	dev@dpdk.org	RESOLVED	FIXED	crypto_preformance_test: core dumped	2018/2/7 13:10
19	DPDK	core	solal.pirelli@gmail.com	RESOLVED	FIXED	Crash on initialization if first RTE_MAX_LCORE cores are disabled	2019/2/1 11:56
23	DPDK	ethdev	konstantin.ananyev@intel.com	RESOLVED	WONTFIX	Ixgbe driver writes to reserved bit in the EIMC register	2018/10/18 9:40
24	DPDK	ethdev	konstantin.ananyev@intel.com	RESOLVED	WONTFIX	Ixgbe driver sets unknown bit of the 82599's SW_FW_SYNC register	2018/10/18 9:41
30	DPDK	cryptodev	wisamm@mellanox.com	RESOLVED	WONTFIX	Compilation error while disabling crypto device library	2020/6/18 22:20
36	DPDK	ethdev	anatoly.burakov@intel.com	RESOLVED	FIXED	drivers/bus/pci/linux/pci_vfio.c does not compile when compilation strictly fails on warnings	2018/11/20 16:27
46	DPDK	other	dev@dpdk.org	CONFIRMED	 ---	Reciprocal division: Fail [Crash]	2018/5/11 12:06
52	DPDK	ethdev	ferruh.yigit@intel.com	RESOLVED	FIXED	Bonding PMD may fail to accept new slaves in certain conditions	2019/6/26 10:21
66	DPDK	ethdev	thomas@monjalon.net	CONFIRMED	 ---	Secondary process must have exact same whitelist "-w" list	2018/6/26 1:14
78	DPDK	doc	dev@dpdk.org	RESOLVED	FIXED	Mismatch between return value and documentation for `rte_hash_lookup_data` (cuckoo hashing implementation)	2018/8/7 19:34
84	DPDK	core	anatoly.burakov@intel.com	RESOLVED	FIXED	Primary process broadcasts vdevs during each secondary's vdev scan	2018/11/20 16:28
109	DPDK	ethdev	ferruh.yigit@intel.com	IN_PROGRESS	 ---	Using the environment variable to get the filepath	2019/6/26 10:30
114	DPDK	core	dev@dpdk.org	RESOLVED	FIXED	rte_rand() is not thread-safe but not documented as such	2019/6/30 7:19
226	DPDK	cryptodev	pablo.de.lara.guarch@intel.com	RESOLVED	FIXED	Cryptodevs instruction for Kasumi isn't correct	2019/3/26 22:19
228	DPDK	core	anatoly.burakov@intel.com	RESOLVED	FIXED	rte_mp_request_sync memleak with multiple recipients	2019/5/3 13:49
258	DPDK	ethdev	dev@dpdk.org	CONFIRMED	 ---	Tap driver unnecessarily triggers timeout on failure	2019/5/1 6:07
288	DPDK	mk	thomas@monjalon.net	CONFIRMED	 ---	Target name recorded wrong when try to build dpdk with x86_64-native-linux-gcc	2019/7/15 20:55
341	DPDK	other	dev@dpdk.org	CONFIRMED	 ---	repeated execution of distributor_autotest fails	2020/5/18 13:58
342	DPDK	other	dev@dpdk.org	RESOLVED	FIXED	distributor_autotest execution gets suspended	2020/4/26 2:22
356	DPDK	vhost/virtio	dev@dpdk.org	RESOLVED	FIXED	Building dpdk with rte_vhost sometimes fails due to missing rte_hash.h	2019/11/21 3:02
365	DPDK	other	dev@dpdk.org	UNCONFIRMED	 ---	Do not reimplement inet_pton	2019/11/13 9:10
385	DPDK	other	reshma.pattan@intel.com	UNCONFIRMED	 ---	latency calculation has potential performance issues	2020/2/5 20:54
420	DPDK	doc	thomas@monjalon.net	RESOLVED	FIXED	Typing error in doc/guides/contributing/patches.rst	2020/5/27 20:31
423	DPDK	other	thomas@monjalon.net	UNCONFIRMED	 ---	usertools/dpdk-setup.sh can not be used to run an application without compiling dpdk first	2020/3/26 2:20
448	DPDK	vhost/virtio	maxime.coquelin@redhat.com	UNCONFIRMED	 ---	Post-copy-Live migration with 8 vhost queues succeeds with warning from QEMU	2020/4/25 2:49
492	DPDK	doc	anatoly.burakov@intel.com	RESOLVED	FIXED	Fix references to /dev/huge	2020/7/31 1:36
80	DPDK	doc	linville@tuxdriver.com	RESOLVED	FIXED	There is not any mention of AF_PACKET PMD in the doc	2019/3/10 8:07
124	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	Add previous/next navigation links to dashboard detail page	2018/12/10 19:32
126	lab	UNH infra	ci@dpdk.org	RESOLVED	INVALID	Rename dev cluster FQDN suffix to dpdkdev.iol.unh.edu	2020/2/25 22:28
127	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	Add a favicon to the dashboard	2018/12/10 19:38
128	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	[Epic] Display historical trend plots on dashboard	2018/12/10 20:29
129	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	[Epic] Add user management functionality to dashboard	2018/12/10 20:31
130	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	As an IOL employee, I would like to send a new user a token-based URL to set their password	2018/12/10 20:31
131	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	As an employee of a Member company, I would like to be able to request a dashboard account	2018/12/10 20:31
132	lab	dashboard	ci@dpdk.org	RESOLVED	FIXED	As a primary contact for a Member company, I would like to manage the users in my organization	2019/11/19 18:00
133	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	As an employee of a Member company, I would like to request/access my VPN credentials	2018/12/10 20:31
134	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	Investigate using OAuth or SAML for dashboard authentication to REST API	2018/12/10 20:31
136	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	Add a way for users to filter results	2018/12/10 19:48
137	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	[Epic] Patchwork 2.1 (API 1.1)	2018/12/10 19:50
138	lab	dashboard	ci@dpdk.org	RESOLVED	FIXED	Delete old log files	2019/11/19 17:55
140	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	Invalidate dashboard cache on database changes	2018/12/10 20:38
141	lab	UNH infra	ci@dpdk.org	RESOLVED	INVALID	Restructure network	2020/2/25 22:27
143	lab	dashboard	ci@dpdk.org	RESOLVED	FIXED	Add a run button to run incomplete tests	2019/4/3 19:25
144	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	[Epic] Add hardware description page	2018/12/10 20:41
145	lab	dashboard	ci@dpdk.org	RESOLVED	FIXED	Add API Key access to the preferences page	2019/11/19 17:44
146	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	Add initial hardware description API	2018/12/10 20:41
147	lab	dashboard	ci@dpdk.org	RESOLVED	FIXED	Add jenkins information to hardware api	2019/4/26 22:29
148	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	Add hardware description UI to the dashboard	2018/12/10 20:41
150	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	Add GA Performance deltas to the detailed view	2018/12/10 20:44
151	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	Add graphing of GA over time to the dashboard	2018/12/10 20:44
152	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	[Epic] Increase performance or perception of performance of the dashboard	2019/1/10 21:04
153	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	Add timezone to date times	2018/12/10 20:08
154	lab	dashboard	ci@dpdk.org	RESOLVED	FIXED	Add a way to select what branch a patchset was meant for	2019/2/5 19:14
155	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	Parse NIC speed into GbE	2018/12/10 20:10
156	lab	dashboard	ci@dpdk.org	RESOLVED	FIXED	The primary contact should be able to update the configuration information pdf	2019/6/17 17:33
157	lab	dashboard	ci@dpdk.org	RESOLVED	FIXED	Allow primary contact to revoke access to accounts	2019/6/17 17:29
158	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	The primary contact should be able to set their environments public or private	2018/12/10 20:31
160	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	Add graphing of LTS over time to the dashboard	2018/12/10 20:29
161	lab	dashboard	ci@dpdk.org	RESOLVED	FIXED	Create master to master overview and detail pages	2019/3/22 20:20
163	lab	dashboard	ci@dpdk.org	RESOLVED	FIXED	Add a way to download the tarball from the detailed view	2019/1/8 17:29
167	lab	job scripts	ci@dpdk.org	RESOLVED	WONTFIX	Check hardware/software for changes on each test run	2020/4/21 16:13
168	lab	job scripts	ci@dpdk.org	RESOLVED	FIXED	Record pipeline CI issues	2019/3/13 19:41
170	lab	UNH infra	blo@iol.unh.edu	CONFIRMED	 ---	Send separate emails to users instead of CCing everyone	2020/6/30 20:21
172	lab	job scripts	ci@dpdk.org	RESOLVED	FIXED	Send updated reports after a rerun	2019/3/19 18:44
173	lab	job scripts	dpdklab@iol.unh.edu	RESOLVED	FIXED	Filter branch instead of going directly to the branch (results api)	2019/1/9 16:20
180	lab	job scripts	ci@dpdk.org	RESOLVED	FIXED	Add link to dashboard website in emailed reports	2019/1/8 20:10
181	lab	job scripts	ci@dpdk.org	RESOLVED	FIXED	Don't run doc patches if only the doc folder has been changed	2019/1/9 15:17
220	lab	dashboard	ci@dpdk.org	RESOLVED	FIXED	Add hardware usage status to the dashboard	2019/6/17 17:44
233	lab	dashboard	ci@dpdk.org	RESOLVED	FIXED	Create a way to share artifacts	2019/8/8 15:07
254	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	Auto create measurements and test cases as results are submitted	2019/4/15 19:44
292	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	Allow members to stop future jobs from running on their host from the dashboard	2019/6/24 20:33
346	DPDK	ethdev	tohofman@cisco.com	RESOLVED	WORKSFORME	Set the link speed / duplex of a DPDK port	2020/5/12 16:08
364	DPDK	doc	dev@dpdk.org	CONFIRMED	 ---	Do not generate temporary doc files in the sources	2020/3/25 8:23
407	lab	UNH infra	ci@dpdk.org	RESOLVED	DUPLICATE	Add ether layer testing to the community lab	2020/4/21 16:20
408	lab	UNH infra	lylavoie@iol.unh.edu	CONFIRMED	 ---	Add Arm hardware to the lab for general testing	2020/7/1 14:49
435	DPDK	testpmd	dev@dpdk.org	UNCONFIRMED	 ---	Proposed improvement to non-interactive loop timing	2020/4/4 3:47
496	DPDK	testpmd	dev@dpdk.org	UNCONFIRMED	 ---	Display link speed capabilities in testpmd	2020/7/22 9:37
511	lab	job scripts	ci@dpdk.org	CONFIRMED	 ---	Add check if performance tests are needed	2020/7/30 15:29
91	DPDK	mk	thomas@monjalon.net	RESOLVED	WONTFIX	Unable to build on Ubuntu 18.04	2020/6/18 22:35
245	lab	UNH infra	ci@dpdk.org	CONFIRMED	 ---	Add virtio testing to the community lab	2020/4/21 16:24
246	lab	UNH infra	ci@dpdk.org	CONFIRMED	 ---	Add cryptodev testing to the community lab	2020/4/21 16:24
247	lab	UNH infra	ci@dpdk.org	CONFIRMED	 ---	Add compression testing to the community lab	2020/4/21 16:24
306	DPDK	ethdev	lionel.fiat@atos.net	CONFIRMED	 ---	Intel X722 chipset DPDK driver issue with WindRiver Titianium R18.03 platform - CentOS 7.4	2019/7/15 20:44
18	DPDK	core	nhorman@tuxdriver.com	RESOLVED	FIXED	mmap with MAP_ANONYMOUS should have fd == -1	2018/4/12 14:55
87	DPDK	other	jerin.jacob@caviumnetworks.com	RESOLVED	FIXED	build dpdk and example with different gcc version issue	2019/7/31 6:14
479	lab	job scripts	blo@iol.unh.edu	CONFIRMED	 ---	Fedora 32  / gcc 10 build testing	2020/6/30 20:30
123	lab	UNH infra	ci@dpdk.org	RESOLVED	FIXED	Add mechanism to periodically image nodes	2019/11/19 20:13
125	lab	UNH infra	ci@dpdk.org	RESOLVED	INVALID	Find a replacement for NFS for Jenkins filestore	2020/2/25 22:28
135	lab	dashboard	ci@dpdk.org	CONFIRMED	 ---	Consider using zxcvbn for client-side password validation	2018/12/10 19:47
159	lab	UNH infra	ci@dpdk.org	RESOLVED	FIXED	Change VPN to use routed configuration instead of bridged	2019/11/19 20:16
171	lab	job scripts	ci@dpdk.org	RESOLVED	WONTFIX	Create LTS performance Jenkins Job	2020/6/30 20:15
238	DPDK	other	dev@dpdk.org	CONFIRMED	 ---	[tree-wide] enhance getopt_long usage	2019/4/2 9:38
429	lab	job scripts	ci@dpdk.org	CONFIRMED	 ---	New Perf Test Case: Test above / below maximum throughput of NIC / system	2020/6/30 20:29
```