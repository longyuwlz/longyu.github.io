# openEuler 20.03 sp2 vmware 虚拟机启动 dmesg 信息
**版本信息：openEuler 20.03 SP2**

```bash
[    0.000000] Linux version 4.19.90-2003.4.0.0036.oe1.x86_64 (abuild@ecs-obsworker-201) (gcc version 7.3.0 (GCC)) #1 SMP Mon Mar 23 19:10:41 UTC 2020
[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-4.19.90-2003.4.0.0036.oe1.x86_64 root=/dev/mapper/openeuler-root ro resume=/dev/mapper/openeuler-swap rd.lvm.lv=openeuler/root rd.lvm.lv=openeuler/swap rhgb quiet quiet crashkernel=512M console=ttyS1,115200
[    0.000000] Disabled fast string operations
[    0.000000] x86/fpu: Supporting XSAVE feature 0x001: 'x87 floating point registers'
[    0.000000] x86/fpu: Supporting XSAVE feature 0x002: 'SSE registers'
[    0.000000] x86/fpu: Supporting XSAVE feature 0x004: 'AVX registers'
[    0.000000] x86/fpu: Supporting XSAVE feature 0x008: 'MPX bounds registers'
[    0.000000] x86/fpu: Supporting XSAVE feature 0x010: 'MPX CSR'
[    0.000000] x86/fpu: xstate_offset[2]:  576, xstate_sizes[2]:  256
[    0.000000] x86/fpu: xstate_offset[3]:  832, xstate_sizes[3]:   64
[    0.000000] x86/fpu: xstate_offset[4]:  896, xstate_sizes[4]:   64
[    0.000000] x86/fpu: Enabled xstate features 0x1f, context size is 960 bytes, using 'compacted' format.
[    0.000000] BIOS-provided physical RAM map:
[    0.000000] BIOS-e820: [mem 0x0000000000000000-0x000000000009ebff] usable
[    0.000000] BIOS-e820: [mem 0x000000000009ec00-0x000000000009ffff] reserved
[    0.000000] BIOS-e820: [mem 0x00000000000dc000-0x00000000000fffff] reserved
[    0.000000] BIOS-e820: [mem 0x0000000000100000-0x000000007fedffff] usable
[    0.000000] BIOS-e820: [mem 0x000000007fee0000-0x000000007fefefff] ACPI data
[    0.000000] BIOS-e820: [mem 0x000000007feff000-0x000000007fefffff] ACPI NVS
[    0.000000] BIOS-e820: [mem 0x000000007ff00000-0x000000007fffffff] usable
[    0.000000] BIOS-e820: [mem 0x00000000f0000000-0x00000000f7ffffff] reserved
[    0.000000] BIOS-e820: [mem 0x00000000fec00000-0x00000000fec0ffff] reserved
[    0.000000] BIOS-e820: [mem 0x00000000fee00000-0x00000000fee00fff] reserved
[    0.000000] BIOS-e820: [mem 0x00000000fffe0000-0x00000000ffffffff] reserved
[    0.000000] NX (Execute Disable) protection: active
[    0.000000] SMBIOS 2.7 present.
[    0.000000] DMI: VMware, Inc. VMware Virtual Platform/440BX Desktop Reference Platform, BIOS 6.00 07/29/2019
[    0.000000] Hypervisor detected: VMware
[    0.000000] vmware: TSC freq read from hypervisor : 3408.004 MHz
[    0.000000] vmware: Host bus clock speed read from hypervisor : 66000000 Hz
[    0.000000] vmware: using sched offset of 12970926257 ns
[    0.000001] tsc: Detected 3408.004 MHz processor
[    0.003059] e820: update [mem 0x00000000-0x00000fff] usable ==> reserved
[    0.003060] e820: remove [mem 0x000a0000-0x000fffff] usable
[    0.003064] last_pfn = 0x80000 max_arch_pfn = 0x400000000
[    0.003080] MTRR default type: uncachable
[    0.003080] MTRR fixed ranges enabled:
[    0.003081]   00000-9FFFF write-back
[    0.003081]   A0000-BFFFF uncachable
[    0.003082]   C0000-CBFFF write-protect
[    0.003082]   CC000-EFFFF uncachable
[    0.003083]   F0000-FFFFF write-protect
[    0.003083] MTRR variable ranges enabled:
[    0.003084]   0 base 00000000000 mask 7FF80000000 write-back
[    0.003085]   1 base 00080000000 mask 7FF80000000 uncachable
[    0.003085]   2 disabled
[    0.003085]   3 disabled
[    0.003085]   4 disabled
[    0.003086]   5 disabled
[    0.003086]   6 disabled
[    0.003086]   7 disabled
[    0.003099] x86/PAT: Configuration [0-7]: WB  WC  UC- UC  WB  WP  UC- WT
[    0.003110] total RAM covered: 2048M
[    0.003376] Found optimal setting for mtrr clean up
[    0.003377]  gran_size: 64K  chunk_size: 64K         num_reg: 1      lose cover RAM: 0G
[    0.011471] found SMP MP-table at [mem 0x000f6a70-0x000f6a7f]
[    0.011748] Using GB pages for direct mapping
[    0.011751] BRK [0x20202000, 0x20202fff] PGTABLE
[    0.011752] BRK [0x20203000, 0x20203fff] PGTABLE
[    0.011753] BRK [0x20204000, 0x20204fff] PGTABLE
[    0.011769] BRK [0x20205000, 0x20205fff] PGTABLE
[    0.011770] BRK [0x20206000, 0x20206fff] PGTABLE
[    0.011809] BRK [0x20207000, 0x20207fff] PGTABLE
[    0.011824] RAMDISK: [mem 0x35240000-0x36917fff]
[    0.011842] ACPI: Early table checksum verification disabled
[    0.011882] ACPI: RSDP 0x00000000000F6A00 000024 (v02 PTLTD )
[    0.011886] ACPI: XSDT 0x000000007FEEA683 00005C (v01 INTEL  440BX    06040000 VMW  01324272)
[    0.011892] ACPI: FACP 0x000000007FEFEE73 0000F4 (v04 INTEL  440BX    06040000 PTL  000F4240)
[    0.011897] ACPI: DSDT 0x000000007FEEB7E9 01368A (v01 PTLTD  Custom   06040000 MSFT 03000001)
[    0.011900] ACPI: FACS 0x000000007FEFFFC0 000040
[    0.011902] ACPI: FACS 0x000000007FEFFFC0 000040
[    0.011904] ACPI: BOOT 0x000000007FEEB7C1 000028 (v01 PTLTD  $SBFTBL$ 06040000  LTP 00000001)
[    0.011907] ACPI: APIC 0x000000007FEEB07F 000742 (v01 PTLTD  ? APIC   06040000  LTP 00000000)
[    0.011909] ACPI: MCFG 0x000000007FEEB043 00003C (v01 PTLTD  $PCITBL$ 06040000  LTP 00000001)
[    0.011911] ACPI: SRAT 0x000000007FEEA77F 000880 (v02 VMWARE MEMPLUG  06040000 VMW  00000001)
[    0.011914] ACPI: HPET 0x000000007FEEA747 000038 (v01 VMWARE VMW HPET 06040000 VMW  00000001)
[    0.011916] ACPI: WAET 0x000000007FEEA71F 000028 (v01 VMWARE VMW WAET 06040000 VMW  00000001)
[    0.011924] ACPI: Local APIC address 0xfee00000
[    0.011931] system APIC only can use physical flat
[    0.011932] Setting APIC routing to physical flat.
[    0.011967] SRAT: PXM 0 -> APIC 0x00 -> Node 0
[    0.011968] SRAT: PXM 0 -> APIC 0x02 -> Node 0
[    0.011968] SRAT: PXM 0 -> APIC 0x04 -> Node 0
[    0.011968] SRAT: PXM 0 -> APIC 0x06 -> Node 0
[    0.011969] SRAT: PXM 0 -> APIC 0x08 -> Node 0
[    0.011969] SRAT: PXM 0 -> APIC 0x0a -> Node 0
[    0.011969] SRAT: PXM 0 -> APIC 0x0c -> Node 0
[    0.011969] SRAT: PXM 0 -> APIC 0x0e -> Node 0
[    0.011970] SRAT: PXM 0 -> APIC 0x10 -> Node 0
[    0.011970] SRAT: PXM 0 -> APIC 0x12 -> Node 0
[    0.011970] SRAT: PXM 0 -> APIC 0x14 -> Node 0
[    0.011971] SRAT: PXM 0 -> APIC 0x16 -> Node 0
[    0.011971] SRAT: PXM 0 -> APIC 0x18 -> Node 0
[    0.011971] SRAT: PXM 0 -> APIC 0x1a -> Node 0
[    0.011972] SRAT: PXM 0 -> APIC 0x1c -> Node 0
[    0.011972] SRAT: PXM 0 -> APIC 0x1e -> Node 0
[    0.011972] SRAT: PXM 0 -> APIC 0x20 -> Node 0
[    0.011972] SRAT: PXM 0 -> APIC 0x22 -> Node 0
[    0.011973] SRAT: PXM 0 -> APIC 0x24 -> Node 0
[    0.011973] SRAT: PXM 0 -> APIC 0x26 -> Node 0
[    0.011973] SRAT: PXM 0 -> APIC 0x28 -> Node 0
[    0.011974] SRAT: PXM 0 -> APIC 0x2a -> Node 0
[    0.011974] SRAT: PXM 0 -> APIC 0x2c -> Node 0
[    0.011974] SRAT: PXM 0 -> APIC 0x2e -> Node 0
[    0.011975] SRAT: PXM 0 -> APIC 0x30 -> Node 0
[    0.011975] SRAT: PXM 0 -> APIC 0x32 -> Node 0
[    0.011975] SRAT: PXM 0 -> APIC 0x34 -> Node 0
[    0.011975] SRAT: PXM 0 -> APIC 0x36 -> Node 0
[    0.011976] SRAT: PXM 0 -> APIC 0x38 -> Node 0
[    0.011976] SRAT: PXM 0 -> APIC 0x3a -> Node 0
[    0.011976] SRAT: PXM 0 -> APIC 0x3c -> Node 0
[    0.011977] SRAT: PXM 0 -> APIC 0x3e -> Node 0
[    0.011977] SRAT: PXM 0 -> APIC 0x40 -> Node 0
[    0.011977] SRAT: PXM 0 -> APIC 0x42 -> Node 0
[    0.011978] SRAT: PXM 0 -> APIC 0x44 -> Node 0
[    0.011978] SRAT: PXM 0 -> APIC 0x46 -> Node 0
[    0.011978] SRAT: PXM 0 -> APIC 0x48 -> Node 0
[    0.011978] SRAT: PXM 0 -> APIC 0x4a -> Node 0
[    0.011979] SRAT: PXM 0 -> APIC 0x4c -> Node 0
[    0.011979] SRAT: PXM 0 -> APIC 0x4e -> Node 0
[    0.011979] SRAT: PXM 0 -> APIC 0x50 -> Node 0
[    0.011980] SRAT: PXM 0 -> APIC 0x52 -> Node 0
[    0.011980] SRAT: PXM 0 -> APIC 0x54 -> Node 0
[    0.011980] SRAT: PXM 0 -> APIC 0x56 -> Node 0
[    0.011980] SRAT: PXM 0 -> APIC 0x58 -> Node 0
[    0.011981] SRAT: PXM 0 -> APIC 0x5a -> Node 0
[    0.011981] SRAT: PXM 0 -> APIC 0x5c -> Node 0
[    0.011981] SRAT: PXM 0 -> APIC 0x5e -> Node 0
[    0.011982] SRAT: PXM 0 -> APIC 0x60 -> Node 0
[    0.011982] SRAT: PXM 0 -> APIC 0x62 -> Node 0
[    0.011982] SRAT: PXM 0 -> APIC 0x64 -> Node 0
[    0.011983] SRAT: PXM 0 -> APIC 0x66 -> Node 0
[    0.011983] SRAT: PXM 0 -> APIC 0x68 -> Node 0
[    0.011983] SRAT: PXM 0 -> APIC 0x6a -> Node 0
[    0.011983] SRAT: PXM 0 -> APIC 0x6c -> Node 0
[    0.011984] SRAT: PXM 0 -> APIC 0x6e -> Node 0
[    0.011984] SRAT: PXM 0 -> APIC 0x70 -> Node 0
[    0.011984] SRAT: PXM 0 -> APIC 0x72 -> Node 0
[    0.011985] SRAT: PXM 0 -> APIC 0x74 -> Node 0
[    0.011985] SRAT: PXM 0 -> APIC 0x76 -> Node 0
[    0.011985] SRAT: PXM 0 -> APIC 0x78 -> Node 0
[    0.011985] SRAT: PXM 0 -> APIC 0x7a -> Node 0
[    0.011986] SRAT: PXM 0 -> APIC 0x7c -> Node 0
[    0.011986] SRAT: PXM 0 -> APIC 0x7e -> Node 0
[    0.011986] SRAT: PXM 0 -> APIC 0x80 -> Node 0
[    0.011987] SRAT: PXM 0 -> APIC 0x82 -> Node 0
[    0.011987] SRAT: PXM 0 -> APIC 0x84 -> Node 0
[    0.011987] SRAT: PXM 0 -> APIC 0x86 -> Node 0
[    0.011988] SRAT: PXM 0 -> APIC 0x88 -> Node 0
[    0.011988] SRAT: PXM 0 -> APIC 0x8a -> Node 0
[    0.011988] SRAT: PXM 0 -> APIC 0x8c -> Node 0
[    0.011988] SRAT: PXM 0 -> APIC 0x8e -> Node 0
[    0.011989] SRAT: PXM 0 -> APIC 0x90 -> Node 0
[    0.011989] SRAT: PXM 0 -> APIC 0x92 -> Node 0
[    0.011989] SRAT: PXM 0 -> APIC 0x94 -> Node 0
[    0.011990] SRAT: PXM 0 -> APIC 0x96 -> Node 0
[    0.011990] SRAT: PXM 0 -> APIC 0x98 -> Node 0
[    0.011990] SRAT: PXM 0 -> APIC 0x9a -> Node 0
[    0.011991] SRAT: PXM 0 -> APIC 0x9c -> Node 0
[    0.011991] SRAT: PXM 0 -> APIC 0x9e -> Node 0
[    0.011991] SRAT: PXM 0 -> APIC 0xa0 -> Node 0
[    0.011991] SRAT: PXM 0 -> APIC 0xa2 -> Node 0
[    0.011992] SRAT: PXM 0 -> APIC 0xa4 -> Node 0
[    0.011992] SRAT: PXM 0 -> APIC 0xa6 -> Node 0
[    0.011992] SRAT: PXM 0 -> APIC 0xa8 -> Node 0
[    0.011993] SRAT: PXM 0 -> APIC 0xaa -> Node 0
[    0.011993] SRAT: PXM 0 -> APIC 0xac -> Node 0
[    0.011993] SRAT: PXM 0 -> APIC 0xae -> Node 0
[    0.011994] SRAT: PXM 0 -> APIC 0xb0 -> Node 0
[    0.011994] SRAT: PXM 0 -> APIC 0xb2 -> Node 0
[    0.011994] SRAT: PXM 0 -> APIC 0xb4 -> Node 0
[    0.011994] SRAT: PXM 0 -> APIC 0xb6 -> Node 0
[    0.011995] SRAT: PXM 0 -> APIC 0xb8 -> Node 0
[    0.011995] SRAT: PXM 0 -> APIC 0xba -> Node 0
[    0.011995] SRAT: PXM 0 -> APIC 0xbc -> Node 0
[    0.011996] SRAT: PXM 0 -> APIC 0xbe -> Node 0
[    0.011996] SRAT: PXM 0 -> APIC 0xc0 -> Node 0
[    0.011996] SRAT: PXM 0 -> APIC 0xc2 -> Node 0
[    0.011997] SRAT: PXM 0 -> APIC 0xc4 -> Node 0
[    0.011997] SRAT: PXM 0 -> APIC 0xc6 -> Node 0
[    0.011997] SRAT: PXM 0 -> APIC 0xc8 -> Node 0
[    0.011997] SRAT: PXM 0 -> APIC 0xca -> Node 0
[    0.011998] SRAT: PXM 0 -> APIC 0xcc -> Node 0
[    0.011998] SRAT: PXM 0 -> APIC 0xce -> Node 0
[    0.011998] SRAT: PXM 0 -> APIC 0xd0 -> Node 0
[    0.011999] SRAT: PXM 0 -> APIC 0xd2 -> Node 0
[    0.011999] SRAT: PXM 0 -> APIC 0xd4 -> Node 0
[    0.011999] SRAT: PXM 0 -> APIC 0xd6 -> Node 0
[    0.011999] SRAT: PXM 0 -> APIC 0xd8 -> Node 0
[    0.012000] SRAT: PXM 0 -> APIC 0xda -> Node 0
[    0.012000] SRAT: PXM 0 -> APIC 0xdc -> Node 0
[    0.012000] SRAT: PXM 0 -> APIC 0xde -> Node 0
[    0.012001] SRAT: PXM 0 -> APIC 0xe0 -> Node 0
[    0.012001] SRAT: PXM 0 -> APIC 0xe2 -> Node 0
[    0.012001] SRAT: PXM 0 -> APIC 0xe4 -> Node 0
[    0.012002] SRAT: PXM 0 -> APIC 0xe6 -> Node 0
[    0.012002] SRAT: PXM 0 -> APIC 0xe8 -> Node 0
[    0.012002] SRAT: PXM 0 -> APIC 0xea -> Node 0
[    0.012002] SRAT: PXM 0 -> APIC 0xec -> Node 0
[    0.012003] SRAT: PXM 0 -> APIC 0xee -> Node 0
[    0.012003] SRAT: PXM 0 -> APIC 0xf0 -> Node 0
[    0.012003] SRAT: PXM 0 -> APIC 0xf2 -> Node 0
[    0.012004] SRAT: PXM 0 -> APIC 0xf4 -> Node 0
[    0.012004] SRAT: PXM 0 -> APIC 0xf6 -> Node 0
[    0.012004] SRAT: PXM 0 -> APIC 0xf8 -> Node 0
[    0.012005] SRAT: PXM 0 -> APIC 0xfa -> Node 0
[    0.012005] SRAT: PXM 0 -> APIC 0xfc -> Node 0
[    0.012005] SRAT: PXM 0 -> APIC 0xfe -> Node 0
[    0.012008] ACPI: SRAT: Node 0 PXM 0 [mem 0x00000000-0x0009ffff]
[    0.012008] ACPI: SRAT: Node 0 PXM 0 [mem 0x00100000-0x7fffffff]
[    0.012010] NUMA: Node 0 [mem 0x00000000-0x0009ffff] + [mem 0x00100000-0x7fffffff] -> [mem 0x00000000-0x7fffffff]
[    0.012016] NODE_DATA(0) allocated [mem 0x7ffd6000-0x7fffffff]
[    0.012152] crashkernel reservation failed - No suitable area found.
[    0.012160] Zone ranges:
[    0.012160]   DMA      [mem 0x0000000000001000-0x0000000000ffffff]
[    0.012161]   DMA32    [mem 0x0000000001000000-0x000000007fffffff]
[    0.012161]   Normal   empty
[    0.012162]   Device   empty
[    0.012162] Movable zone start for each node
[    0.012164] Early memory node ranges
[    0.012165]   node   0: [mem 0x0000000000001000-0x000000000009dfff]
[    0.012165]   node   0: [mem 0x0000000000100000-0x000000007fedffff]
[    0.012166]   node   0: [mem 0x000000007ff00000-0x000000007fffffff]
[    0.012172] Reserved but unavailable: 99 pages
[    0.012173] Initmem setup node 0 [mem 0x0000000000001000-0x000000007fffffff]
[    0.012174] On node 0 totalpages: 524157
[    0.012174]   DMA zone: 64 pages used for memmap
[    0.012175]   DMA zone: 21 pages reserved
[    0.012175]   DMA zone: 3997 pages, LIFO batch:0
[    0.012282]   DMA32 zone: 8128 pages used for memmap
[    0.012283]   DMA32 zone: 520160 pages, LIFO batch:63
[    0.016807] ACPI: PM-Timer IO Port: 0x1008
[    0.0dm16808] ACPI: Local APIC address 0xfee00000
[    0.016810] system APIC only can use physical flat
[    0.016818] ACPI: LAPIC_NMI (acpi_id[0x00] high edge lint[0x1])
[    0.016819] ACPI: LAPIC_NMI (acpi_id[0x01] high edge lint[0x1])
[    0.016819] ACPI: LAPIC_NMI (acpi_id[0x02] high edge lint[0x1])
[    0.016819] ACPI: LAPIC_NMI (acpi_id[0x03] high edge lint[0x1])
[    0.016820] ACPI: LAPIC_NMI (acpi_id[0x04] high edge lint[0x1])
[    0.016820] ACPI: LAPIC_NMI (acpi_id[0x05] high edge lint[0x1])
[    0.016820] ACPI: LAPIC_NMI (acpi_id[0x06] high edge lint[0x1])
[    0.016821] ACPI: LAPIC_NMI (acpi_id[0x07] high edge lint[0x1])
[    0.016821] ACPI: LAPIC_NMI (acpi_id[0x08] high edge lint[0x1])
[    0.016821] ACPI: LAPIC_NMI (acpi_id[0x09] high edge lint[0x1])
[    0.016822] ACPI: LAPIC_NMI (acpi_id[0x0a] high edge lint[0x1])
[    0.016822] ACPI: LAPIC_NMI (acpi_id[0x0b] high edge lint[0x1])
[    0.016822] ACPI: LAPIC_NMI (acpi_id[0x0c] high edge lint[0x1])
[    0.016823] ACPI: LAPIC_NMI (acpi_id[0x0d] high edge lint[0x1])
[    0.016823] ACPI: LAPIC_NMI (acpi_id[0x0e] high edge lint[0x1])
[    0.016823] ACPI: LAPIC_NMI (acpi_id[0x0f] high edge lint[0x1])
[    0.016824] ACPI: LAPIC_NMI (acpi_id[0x10] high edge lint[0x1])
[    0.016824] ACPI: LAPIC_NMI (acpi_id[0x11] high edge lint[0x1])
[    0.016824] ACPI: LAPIC_NMI (acpi_id[0x12] high edge lint[0x1])
[    0.016824] ACPI: LAPIC_NMI (acpi_id[0x13] high edge lint[0x1])
[    0.016825] ACPI: LAPIC_NMI (acpi_id[0x14] high edge lint[0x1])
[    0.016825] ACPI: LAPIC_NMI (acpi_id[0x15] high edge lint[0x1])
[    0.016825] ACPI: LAPIC_NMI (acpi_id[0x16] high edge lint[0x1])
[    0.016826] ACPI: LAPIC_NMI (acpi_id[0x17] high edge lint[0x1])
[    0.016826] ACPI: LAPIC_NMI (acpi_id[0x18] high edge lint[0x1])
[    0.016826] ACPI: LAPIC_NMI (acpi_id[0x19] high edge lint[0x1])
[    0.016827] ACPI: LAPIC_NMI (acpi_id[0x1a] high edge lint[0x1])
[    0.016827] ACPI: LAPIC_NMI (acpi_id[0x1b] high edge lint[0x1])
[    0.016827] ACPI: LAPIC_NMI (acpi_id[0x1c] high edge lint[0x1])
[    0.016828] ACPI: LAPIC_NMI (acpi_id[0x1d] high edge lint[0x1])
[    0.016828] ACPI: LAPIC_NMI (acpi_id[0x1e] high edge lint[0x1])
[    0.016828] ACPI: LAPIC_NMI (acpi_id[0x1f] high edge lint[0x1])
[    0.016828] ACPI: LAPIC_NMI (acpi_id[0x20] high edge lint[0x1])
[    0.016829] ACPI: LAPIC_NMI (acpi_id[0x21] high edge lint[0x1])
[    0.016829] ACPI: LAPIC_NMI (acpi_id[0x22] high edge lint[0x1])
[    0.016829] ACPI: LAPIC_NMI (acpi_id[0x23] high edge lint[0x1])
[    0.016830] ACPI: LAPIC_NMI (acpi_id[0x24] high edge lint[0x1])
[    0.016830] ACPI: LAPIC_NMI (acpi_id[0x25] high edge lint[0x1])
[    0.016830] ACPI: LAPIC_NMI (acpi_id[0x26] high edge lint[0x1])
[    0.016831] ACPI: LAPIC_NMI (acpi_id[0x27] high edge lint[0x1])
[    0.016831] ACPI: LAPIC_NMI (acpi_id[0x28] high edge lint[0x1])
[    0.016831] ACPI: LAPIC_NMI (acpi_id[0x29] high edge lint[0x1])
[    0.016832] ACPI: LAPIC_NMI (acpi_id[0x2a] high edge lint[0x1])
[    0.016832] ACPI: LAPIC_NMI (acpi_id[0x2b] high edge lint[0x1])
[    0.016832] ACPI: LAPIC_NMI (acpi_id[0x2c] high edge lint[0x1])
[    0.016832] ACPI: LAPIC_NMI (acpi_id[0x2d] high edge lint[0x1])
[    0.016833] ACPI: LAPIC_NMI (acpi_id[0x2e] high edge lint[0x1])
[    0.016833] ACPI: LAPIC_NMI (acpi_id[0x2f] high edge lint[0x1])
[    0.016833] ACPI: LAPIC_NMI (acpi_id[0x30] high edge lint[0x1])
[    0.016834] ACPI: LAPIC_NMI (acpi_id[0x31] high edge lint[0x1])
[    0.016834] ACPI: LAPIC_NMI (acpi_id[0x32] high edge lint[0x1])
[    0.016834] ACPI: LAPIC_NMI (acpi_id[0x33] high edge lint[0x1])
[    0.016835] ACPI: LAPIC_NMI (acpi_id[0x34] high edge lint[0x1])
[    0.016835] ACPI: LAPIC_NMI (acpi_id[0x35] high edge lint[0x1])
[    0.016835] ACPI: LAPIC_NMI (acpi_id[0x36] high edge lint[0x1])
[    0.016836] ACPI: LAPIC_NMI (acpi_id[0x37] high edge lint[0x1])
[    0.016836] ACPI: LAPIC_NMI (acpi_id[0x38] high edge lint[0x1])
[    0.016836] ACPI: LAPIC_NMI (acpi_id[0x39] high edge lint[0x1])
[    0.016836] ACPI: LAPIC_NMI (acpi_id[0x3a] high edge lint[0x1])
[    0.016837] ACPI: LAPIC_NMI (acpi_id[0x3b] high edge lint[0x1])
[    0.016837] ACPI: LAPIC_NMI (acpi_id[0x3c] high edge lint[0x1])
[    0.016837] ACPI: LAPIC_NMI (acpi_id[0x3d] high edge lint[0x1])
[    0.016838] ACPIs: LAPIC_NMI (acpi_id[0x3e] high edge lint[0x1])
[    0.016838] ACPI: LAPIC_NMI (acpi_id[0x3f] high edge lint[0x1])
[    0.016838] ACPI: LAPIC_NMI (acpi_id[0x40] high edge lint[0x1])
[    0.016839] ACPI: LAPIC_NMI (acpi_id[0x41] high edge lint[0x1])
[    0.016839] ACPI: LAPIC_NMI (acpi_id[0x42] high edge lint[0x1])
[    0.016839] ACPI: LAPIC_NMI (acpi_id[0x43] high edge lint[0x1])
[    0.016839] ACPI: LAPIC_NMI (acpi_id[0x44] high edge lint[0x1])
[    0.016840] ACPI: LAPIC_NMI (acpi_id[0x45] high edge lint[0x1])
[    0.016840] ACPI: LAPIC_NMI (acpi_id[0x46] high edge lint[0x1])
[    0.016840] ACPI: LAPIC_NMI (acpi_id[0x47] high edge lint[0x1])
[    0.016841] ACPI: LAPIC_NMI (acpi_id[0x48] high edge lint[0x1])
[    0.016841] ACPI: LAPIC_NMI (acpi_id[0x49] high edge lint[0x1])
[    0.016841] ACPI: LAPIC_NMI (acpi_id[0x4a] high edge lint[0x1])
[    0.016842] ACPI: LAPIC_NMI (acpi_id[0x4b] high edge lint[0x1])
[    0.016842] ACPI: LAPIC_NMI (acpi_id[0x4c] high edge lint[0x1])
[    0.016842] ACPI: LAPIC_NMI (acpi_id[0x4d] high edge lint[0x1])
[    0.016843] ACPI: LAPIC_NMI (acpi_id[0x4e] high edge lint[0x1])
[    0.016843] ACPI: LAPIC_NMI (acpi_id[0x4f] high edge lint[0x1])
[    0.016843] ACPI: LAPIC_NMI (acpi_id[0x50] high edge lint[0x1])
[    0.016843] ACPI: LAPIC_NMI (acpi_id[0x51] high edge lint[0x1])
[    0.016844] ACPI: LAPIC_NMI (acpi_id[0x52] high edge lint[0x1])
[    0.016844] ACPI: LAPIC_NMI (acpi_id[0x53] high edge lint[0x1])
[    0.016844] ACPI: LAPIC_NMI (acpi_id[0x54] high edge lint[0x1])
[    0.016845] ACPI: LAPIC_NMI (acpi_id[0x55] high edge lint[0x1])
[    0.016845] ACPI: LAPIC_NMI (acpi_id[0x56] high edge lint[0x1])
[    0.016845] ACPI: LAPIC_NMI (acpi_id[0x57] high edge lint[0x1])
[    0.016846] ACPI: LAPIC_NMI (acpi_id[0x58] high edge lint[0x1])
[    0.016846] ACPI: LAPIC_NMI (acpi_id[0x59] high edge lint[0x1])
[    0.016846] ACPI: LAPIC_NMI (acpi_id[0x5a] high edge lint[0x1])
[    0.016846] ACPI: LAPIC_NMI (acpi_id[0x5b] high edge lint[0x1])
[    0.016847] ACPI: LAPIC_NMI (acpi_id[0x5c] high edge lint[0x1])
[    0.016847] ACPI: LAPIC_NMI (acpi_id[0x5d] high edge lint[0x1])
[    0.016847] ACPI: LAPIC_NMI (acpi_id[0x5e] high edge lint[0x1])
[    0.016848] ACPI: LAPIC_NMI (acpi_id[0x5f] high edge lint[0x1])
[    0.016848] ACPI: LAPIC_NMI (acpi_id[0x60] high edge lint[0x1])
[    0.016848] ACPI: LAPIC_NMI (acpi_id[0x61] high edge lint[0x1])
[    0.016849] ACPI: LAPIC_NMI (acpi_id[0x62] high edge lint[0x1])
[    0.016849] ACPI: LAPIC_NMI (acpi_id[0x63] high edge lint[0x1])
[    0.016849] ACPI: LAPIC_NMI (acpi_id[0x64] high edge lint[0x1])
[    0.016850] ACPI: LAPIC_NMI (acpi_id[0x65] high edge lint[0x1])
[    0.016850] ACPI: LAPIC_NMI (acpi_id[0x66] high edge lint[0x1])
[    0.016850] ACPI: LAPIC_NMI (acpi_id[0x67] high edge lint[0x1])
[    0.016850] ACPI: LAPIC_NMI (acpi_id[0x68] high edge lint[0x1])
[    0.016851] ACPI: LAPIC_NMI (acpi_id[0x69] high edge lint[0x1])
[    0.016851] ACPI: LAPIC_NMI (acpi_id[0x6a] high edge lint[0x1])
[    0.016851] ACPI: LAPIC_NMI (acpi_id[0x6b] high edge lint[0x1])
[    0.016852] ACPI: LAPIC_NMI (acpi_id[0x6c] high edge lint[0x1])
[    0.016852] ACPI: LAPIC_NMI (acpi_id[0x6d] high edge lint[0x1])
[    0.016852] ACPI: LAPIC_NMI (acpi_id[0x6e] high edge lint[0x1])
[    0.016853] ACPI: LAPIC_NMI (acpi_id[0x6f] high edge lint[0x1])
[    0.016853] ACPI: LAPIC_NMI (acpi_id[0x70] high edge lint[0x1])
[    0.016853] ACPI: LAPIC_NMI (acpi_id[0x71] high edge lint[0x1])
[    0.016854] ACPI: LAPIC_NMI (acpi_id[0x72] high edge lint[0x1])
[    0.016854] ACPI: LAPIC_NMI (acpi_id[0x73] high edge lint[0x1])
[    0.016854] ACPI: LAPIC_NMI (acpi_id[0x74] high edge lint[0x1])
[    0.016854] ACPI: LAPIC_NMI (acpi_id[0x75] high edge lint[0x1])
[    0.016855] ACPI: LAPIC_NMI (acpi_id[0x76] high edge lint[0x1])
[    0.016855] ACPI: LAPIC_NMI (acpi_id[0x77] high edge lint[0x1])
[    0.016855] ACPI: LAPIC_NMI (acpi_id[0x78] high edge lint[0x1])
[    0.016856] ACPI: LAPIC_NMI (acpi_id[0x79] high edge lint[0x1])
[    0.016856] ACPI: LAPIC_NMI (acepi_id[0x7a] high edge lint[0x1])
[    0.016856] ACPI: LAPIC_NMI (acpi_id[0x7b] high edge lint[0x1])
[    0.016857] ACPI: LAPIC_NMI (acpi_id[0x7c] high edge lint[0x1])
[    0.016857] ACPI: LAPIC_NMI (acpi_id[0x7d] high edge lint[0x1])
[    0.016857] ACPI: LAPIC_NMI (acpi_id[0x7e] high edge lint[0x1])
[    0.016858] ACPI: LAPIC_NMI (acpi_id[0x7f] high edge lint[0x1])
[    0.016883] IOAPIC[0]: apic_id 1, version 32, address 0xfec00000, GSI 0-23
[    0.016885] ACPI: INT_SRC_OVR (bus 0 bus_irq 0 global_irq 2 high edge)
[    0.016887] ACPI: IRQ0 used by override.
[    0.016888] ACPI: IRQ9 used by override.
[    0.016890] Using ACPI (MADT) for SMP configuration information
[    0.016891] ACPI: HPET id: 0x8086af01 base: 0xfed00000
[    0.016898] smpboot: Allowing 128 CPUs, 126 hotplug CPUs
[    0.016907] PM: Registered nosave memory: [mem 0x00000000-0x00000fff]
[    0.016908] PM: Registered nosave memory: [mem 0x0009e000-0x0009efff]
[    0.016908] PM: Registered nosave memory: [mem 0x0009f000-0x0009ffff]
[    0.016909] PM: Registered nosave memory: [mem 0x000a0000-0x000dbfff]
[    0.016909] PM: Registered nosave memory: [mem 0x000dc000-0x000fffff]
[    0.016910] PM: Registered nosave memory: [mem 0x7fee0000-0x7fefefff]
[    0.016910] PM: Registered nosave memory: [mem 0x7feff000-0x7fefffff]
[    0.016911] [mem 0x80000000-0xefffffff] available for PCI devices
[    0.016911] Booting paravirtualized kernel on VMware hypervisor
[    0.016913] clocksource: refined-jiffies: mask: 0xffffffff max_cycles: 0xffffffff, max_idle_ns: 1910969940391419 ns
[    0.103516] random: get_random_bytes called from start_kernel+0x94/0x546 with crng_init=0
[    0.103522] setup_percpu: NR_CPUS:8192 nr_cpumask_bits:128 nr_cpu_ids:128 nr_node_ids:1
[    0.114997] percpu: Embedded 46 pages/cpu s151552 r8192 d28672 u262144
[    0.115006] pcpu-alloc: s151552 r8192 d28672 u262144 alloc=1*2097152
[    0.115007] pcpu-alloc: [0] 000 001 002 003 004 005 006 007
[    0.115008] pcpu-alloc: [0] 008 009 010 011 012 013 014 015
[    0.115010] pcpu-alloc: [0] 016 017 018 019 020 021 022 023
[    0.115011] pcpu-alloc: [0] 024 025 026 027 028 029 030 031
[    0.115012] pcpu-alloc: [0] 032 033 034 035 036 037 038 039
[    0.115013] pcpu-alloc: [0] 040 041 042 043 044 045 046 047
[    0.115014] pcpu-alloc: [0] 048 049 050 051 052 053 054 055
[    0.115015] pcpu-alloc: [0] 056 057 058 059 060 061 062 063
[    0.115016] pcpu-alloc: [0] 064 065 066 067 068 069 070 071
[    0.115017] pcpu-alloc: [0] 072 073 074 075 076 077 078 079
[    0.115018] pcpu-alloc: [0] 080 081 082 083 084 085 086 087
[    0.115019] pcpu-alloc: [0] 088 089 090 091 092 093 094 095
[    0.115020] pcpu-alloc: [0] 096 097 098 099 100 101 102 103
[    0.115021] pcpu-alloc: [0] 104 105 106 107 108 109 110 111
[    0.115023] pcpu-alloc: [0] 112 113 114 115 116 117 118 119
[    0.115024] pcpu-alloc: [0] 120 121 122 123 124 125 126 127
[    0.115055] Built 1 zonelists, mobility grouping on.  Total pages: 515944
[    0.115056] Policy zone: DMA32
[    0.115058] Kernel command line: BOOT_IMAGE=/vmlinuz-4.19.90-2003.4.0.0036.oe1.x86_64 root=/dev/mapper/openeuler-root ro resume=/dev/mapper/openeuler-swap rd.lvm.lv=openeuler/root rd.lvm.lv=openeuler/swap rhgb quiet quiet crashkernel=512M console=ttyS1,115200
[    0.119172] Memory: 261664K/2096628K available (12300K kernel code, 2486K rwdata, 3692K rodata, 2360K init, 6008K bss, 112896K reserved, 0K cma-reserved)
[    0.119354] SLUB: HWalign=64, Order=0-3, MinObjects=0, CPUs=128, Nodes=1
[    0.119363] Kernel/User page tables isolation: enabled
[    0.119407] ftrace: allocating 35538 entries in 139 pages
[    0.132022] rcu: Hierarchical RCU implementation.
[    0.132023] rcu:     RCU restricting CPUs from NR_CPUS=8192 to nr_cpu_ids=128.
[    0.132024] rcu: Adjusting geometry for rcu_fanout_leaf=16, nr_cpu_ids=128
[    0.133723] NR_IRQS: 524544, nr_irqs: 1448, preallocated irqs: 16
[    0.135885] Console: colour VGA+ 80x25
[    0.135966] console [ttyS1] enabled
[    0.135995] ACPI: Core revision 20180810
[    0.136318] clocksource: hpet: mask: 0xffffffff max_cycles: 0xffffffff, max_idle_ns: 133484882848 ns
[    0.136371] hpet clockevent registered
[    0.136379] APIC: Switch to symmetric I/O mode setup
[    0.136575] x2apic enabled
[    0.136766] Switched APIC routing to physical x2apic.
[    0.137766] ..TIMER: vector=0x30 apic1=0 pin1=2 apic2=-1 pin2=-1
[    0.137788] clocksource: tsc-early: mask: 0xffffffffffffffff max_cycles: 0x311fd7ed0ff, max_idle_ns: 440795285512 ns
[    0.137803] Calibrating delay loop (skipped) preset value.. 6816.00 BogoMIPS (lpj=3408004)
[    0.137804] pid_max: default: 131072 minimum: 1024
[    0.137864] Security Framework initialized
[    0.137865] Yama: becoming mindful.
[    0.137872] SELinux:  Initializing.
[    0.138588] Dentry cache hash table entries: 262144 (order: 9, 2097152 bytes)
[    0.138789] Inode-cache hash table entries: 131072 (order: 8, 1048576 bytes)
[    0.138796] Mount-cache hash table entries: 4096 (order: 3, 32768 bytes)
[    0.138809] Mountpoint-cache hash table entries: 4096 (order: 3, 32768 bytes)
[    0.139797] Disabled fast string operations
[    0.139862] Last level iTLB entries: 4KB 64, 2MB 8, 4MB 8
[    0.139863] Last level dTLB entries: 4KB 64, 2MB 0, 4MB 0, 1GB 4
[    0.139864] Spectre V1 : Mitigation: usercopy/swapgs barriers and __user pointer sanitization
[    0.139865] Spectre V2 : Mitigation: Full generic retpoline
[    0.139866] Spectre V2 : Spectre v2 / SpectreRSB mitigation: Filling RSB on context switch
[    0.139866] Spectre V2 : Enabling Restricted Speculation for firmware calls
[    0.139873] Spectre V2 : mitigation: Enabling conditional Indirect Branch Prediction Barrier
[    0.139874] Speculative Store Bypass: Mitigation: Speculative Store Bypass disabled via prctl and seccomp
[    0.139944] TAA: Mitigation: Clear CPU buffers
[    0.139944] MDS: Mitigation: Clear CPU buffers
[    0.140247] Freeing SMP alternatives memory: 36K
[    0.143057] TSC deadline timer enabled
[    0.143081] smpboot: CPU0: Intel(R) Core(TM) i7-6700 CPU @ 3.40GHz (family: 0x6, model: 0x5e, stepping: 0x3)
[    0.143194] Performance Events: Skylake events, core PMU driver.
[    0.143208] core: CPUID marked event: 'cpu cycles' unavailable
[    0.143208] core: CPUID marked event: 'instructions' unavailable
[    0.143208] core: CPUID marked event: 'bus cycles' unavailable
[    0.143209] core: CPUID marked event: 'cache references' unavailable
[    0.143209] core: CPUID marked event: 'cache misses' unavailable
[    0.143209] core: CPUID marked event: 'branch instructions' unavailable
[    0.143209] core: CPUID marked event: 'branch misses' unavailable
[    0.143211] ... version:                1
[    0.143211] ... bit width:              48
[    0.143212] ... generic registers:      4
[    0.143212] ... value mask:             0000ffffffffffff
[    0.143212] ... max period:             000000007fffffff
[    0.143213] ... fixed-purpose events:   0
[    0.143213] ... event mask:             000000000000000f
[    0.143262] rcu: Hierarchical SRCU implementation.
[    0.144344] smp: Bringing up secondary CPUs ...
[    0.144439] x86: Booting SMP configuration:
[    0.144439] .... node  #0, CPUs:          #1
[    0.004760] Disabled fast string operations
[    0.004760] smpboot: CPU 1 Converting physical 2 to logical package 1
[    0.144937] smp: Brought up 1 node, 2 CPUs
[    0.144937] smpboot: Max logical packages: 128
[    0.144937] smpboot: Total of 2 processors activated (13632.01 BogoMIPS)
[    0.152796] node 0 initialised, 430517 pages in 8ms
[    0.154159] devtmpfs: initialized
[    0.154159] x86/mm: Memory block size: 128MB
[    0.154159] PM: Registering ACPI NVS region [mem 0x7feff000-0x7fefffff] (4096 bytes)
[    0.154840] clocksource: jiffies: mask: 0xffffffff max_cycles: 0xffffffff, max_idle_ns: 1911260446275000 ns
[    0.154897] futex hash table entries: 32768 (order: 9, 2097152 bytes)
[    0.155360] pinctrl core: initialized pinctrl subsystem
[    0.155597] NET: Registered protocol family 16
[    0.155659] audit: initializing netlink subsys (disabled)
[    0.155809] audit: type=2000 audit(1626852859.018:1): state=initialized audit_enabled=0 res=1
[    0.155935] cpuidle: using governor menu
[    0.155935] Simple Boot Flag at 0x36 set to 0x80
[    0.155935] ACPI: bus type PCI registered
[    0.155935] acpiphp: ACPI Hot Plug PCI Controller Driver version: 0.5
[    0.156032] PCI: MMCONFIG for domain 0000 [bus 00-7f] at [mem 0xf0000000-0xf7ffffff] (base 0xf0000000)
[    0.156034] PCI: MMCONFIG at [mem 0xf0000000-0xf7ffffff] reserved in E820
[    0.156040] PCI: Using configuration type 1 for base access
[    0.157042] HugeTLB registered 1.00 GiB page size, pre-allocated 0 pages
[    0.157042] HugeTLB registered 2.00 MiB page size, pre-allocated 0 pages
[    0.157855] cryptd: max_cpu_qlen set to 1000
[    0.157910] ACPI: Added _OSI(Module Device)
[    0.157911] ACPI: Added _OSI(Processor Device)
[    0.157911] ACPI: Added _OSI(3.0 _SCP Extensions)
[    0.157912] ACPI: Added _OSI(Processor Aggregator Device)
[    0.157912] ACPI: Added _OSI(Linux-Dell-Video)
[    0.157913] ACPI: Added _OSI(Linux-Lenovo-NV-HDMI-Audio)
[    0.160789] ACPI: 1 ACPI AML tables successfully acquired and loaded
[    0.162789] ACPI: [Firmware Bug]: BIOS _OSI(Linux) query ignored
[    0.174789] ACPI: Interpreter enabled
[    0.174789] ACPI: (supports S0 S1 S4 S5)
[    0.174789] ACPI: Using IOAPIC for interrupt routing
[    0.174789] PCI: Using host bridge windows from ACPI; if necessary, use "pci=nocrs" and report a bug
[    0.175134] ACPI: Enabled 4 GPEs in block 00 to 0F
[    0.214323] ACPI: PCI Root Bridge [PCI0] (domain 0000 [bus 00-7f])
[    0.214328] acpi PNP0A03:00: _OSC: OS supports [ExtendedConfig ASPM ClockPM Segments MSI]
[    0.214448] acpi PNP0A03:00: _OSC: platform does not support [AER LTR]
[    0.214566] acpi PNP0A03:00: _OSC: OS now controls [PCIeHotplug SHPCHotplug PME PCIeCapability]
[    0.216122] PCI host bridge to bus 0000:00
[    0.216124] pci_bus 0000:00: root bus resource [mem 0x000a0000-0x000bffff window]
[    0.216126] pci_bus 0000:00: root bus resource [mem 0x000cc000-0x000cffff window]
[    0.216126] pci_bus 0000:00: root bus resource [mem 0x000d0000-0x000d3fff window]
[    0.216127] pci_bus 0000:00: root bus resource [mem 0x000d4000-0x000d7fff window]
[    0.216127] pci_bus 0000:00: root bus resource [mem 0x000d8000-0x000dbfff window]
[    0.216128] pci_bus 0000:00: root bus resource [mem 0x80000000-0xfebfffff window]
[    0.216129] pci_bus 0000:00: root bus resource [io  0x0000-0x0cf7 window]
[    0.216129] pci_bus 0000:00: root bus resource [io  0x0d00-0xfeff window]
[    0.216130] pci_bus 0000:00: root bus resource [bus 00-7f]
[    0.216177] pci 0000:00:00.0: [8086:7190] type 00 class 0x060000
[    0.216792] pci 0000:00:01.0: [8086:7191] type 01 class 0x060400
[    0.217365] pci 0000:00:07.0: [8086:7110] type 00 class 0x060100
[    0.218117] pci 0000:00:07.1: [8086:7111] type 00 class 0x01018a
[    0.219267] pci 0000:00:07.1: reg 0x20: [io  0x1060-0x106f]
[    0.219655] pci 0000:00:07.1: legacy IDE quirk: reg 0x10: [io  0x01f0-0x01f7]
[    0.219655] pci 0000:00:07.1: legacy IDE quirk: reg 0x14: [io  0x03f6]
[    0.219656] pci 0000:00:07.1: legacy IDE quirk: reg 0x18: [io  0x0170-0x0177]
[    0.219656] pci 0000:00:07.1: legacy IDE quirk: reg 0x1c: [io  0x0376]
[    0.219832] pci 0000:00:07.3: [8086:7113] type 00 class 0x068000
[    0.223874] pci 0000:00:07.3: quirk: [io  0x1000-0x103f] claimed by PIIX4 ACPI
[    0.223886] pci 0000:00:07.3: quirk: [io  0x1040-0x104f] claimed by PIIX4 SMB
[    0.224347] pci 0000:00:07.7: [15ad:0740] type 00 class 0x088000
[    0.225258] pci 0000:00:07.7: reg 0x10: [io  0x1080-0x10bf]
[    0.225692] pci 0000:00:07.7: reg 0x14: [mem 0xfebfe000-0xfebfffff 64bit]
[    0.227589] pci 0000:00:0f.0: [15ad:0405] type 00 class 0x030000
[    0.228798] pci 0000:00:0f.0: reg 0x10: [io  0x1070-0x107f]
[    0.229795] pci 0000:00:0f.0: reg 0x14: [mem 0xe8000000-0xefffffff pref]
[    0.230794] pci 0000:00:0f.0: reg 0x18: [mem 0xfe000000-0xfe7fffff]
[    0.234794] pci 0000:00:0f.0: reg 0x30: [mem 0x00000000-0x00007fff pref]
[    0.235343] pci 0000:00:10.0: [1000:0030] type 00 class 0x010000
[    0.235793] pci 0000:00:10.0: reg 0x10: [io  0x1400-0x14ff]
[    0.236436] pci 0000:00:10.0: reg 0x14: [mem 0xfeba0000-0xfebbffff 64bit]
[    0.236793] pci 0000:00:10.0: reg 0x1c: [mem 0xfebc0000-0xfebdffff 64bit]
[    0.237793] pci 0000:00:10.0: reg 0x30: [mem 0x00000000-0x00003fff pref]
[    0.238184] pci 0000:00:11.0: [15ad:0790] type 01 class 0x060401
[    0.239036] pci 0000:00:15.0: [15ad:07a0] type 01 class 0x060400
[    0.240732] pci 0000:00:15.0: PME# supported from D0 D3hot D3cold
[    0.241263] pci 0000:00:15.1: [15ad:07a0] type 01 class 0x060400
[    0.242309] pci 0000:00:15.1: PME# supported from D0 D3hot D3cold
[    0.242868] pci 0000:00:15.2: [15ad:07a0] type 01 class 0x060400
[    0.243867] pci 0000:00:15.2: PME# supported from D0 D3hot D3cold
[    0.244258] pci 0000:00:15.3: [15ad:07a0] type 01 class 0x060400
[    0.245074] pci 0000:00:15.3: PME# supported from D0 D3hot D3cold
[    0.245464] pci 0000:00:15.4: [15ad:07a0] type 01 class 0x060400
[    0.246315] pci 0000:00:15.4: PME# supported from D0 D3hot D3cold
[    0.246644] pci 0000:00:15.5: [15ad:07a0] type 01 class 0x060400
[    0.247543] pci 0000:00:15.5: PME# supported from D0 D3hot D3cold
[    0.247866] pci 0000:00:15.6: [15ad:07a0] type 01 class 0x060400
[    0.248753] pci 0000:00:15.6: PME# supported from D0 D3hot D3cold
[    0.249099] pci 0000:00:15.7: [15ad:07a0] type 01 class 0x060400
[    0.249949] pci 0000:00:15.7: PME# supported from D0 D3hot D3cold
[    0.250347] pci 0000:00:16.0: [15ad:07a0] type 01 class 0x060400
[    0.251142] pci 0000:00:16.0: PME# supported from D0 D3hot D3cold
[    0.251477] pci 0000:00:16.1: [15ad:07a0] type 01 class 0x060400
[    0.252338] pci 0000:00:16.1: PME# supported from D0 D3hot D3cold
[    0.252674] pci 0000:00:16.2: [15ad:07a0] type 01 class 0x060400
[    0.253700] pci 0000:00:16.2: PME# supported from D0 D3hot D3cold
[    0.254196] pci 0000:00:16.3: [15ad:07a0] type 01 class 0x060400
[    0.255455] pci 0000:00:16.3: PME# supported from D0 D3hot D3cold
[    0.255923] pci 0000:00:16.4: [15ad:07a0] type 01 class 0x060400
[    0.256891] pci 0000:00:16.4: PME# supported from D0 D3hot D3cold
[    0.257277] pci 0000:00:16.5: [15ad:07a0] type 01 class 0x060400
[    0.258218] pci 0000:00:16.5: PME# supported from D0 D3hot D3cold
[    0.258643] pci 0000:00:16.6: [15ad:07a0] type 01 class 0x060400
[    0.259504] pci 0000:00:16.6: PME# supported from D0 D3hot D3cold
[    0.259840] pci 0000:00:16.7: [15ad:07a0] type 01 class 0x060400
[    0.260703] pci 0000:00:16.7: PME# supported from D0 D3hot D3cold
[    0.261102] pci 0000:00:17.0: [15ad:07a0] type 01 class 0x060400
[    0.261922] pci 0000:00:17.0: PME# supported from D0 D3hot D3cold
[    0.262294] pci 0000:00:17.1: [15ad:07a0] type 01 class 0x060400
[    0.263143] pci 0000:00:17.1: PME# supported from D0 D3hot D3cold
[    0.263479] pci 0000:00:17.2: [15ad:07a0] type 01 class 0x060400
[    0.264309] pci 0000:00:17.2: PME# supported from D0 D3hot D3cold
[    0.264646] pci 0000:00:17.3: [15ad:07a0] type 01 class 0x060400
[    0.265506] pci 0000:00:17.3: PME# supported from D0 D3hot D3cold
[    0.265875] pci 0000:00:17.4: [15ad:07a0] type 01 class 0x060400
[    0.266689] pci 0000:00:17.4: PME# supported from D0 D3hot D3cold
[    0.267070] pci 0000:00:17.5: [15ad:07a0] type 01 class 0x060400
[    0.267916] pci 0000:00:17.5: PME# supported from D0 D3hot D3cold
[    0.268270] pci 0000:00:17.6: [15ad:07a0] type 01 class 0x060400
[    0.269470] pci 0000:00:17.6: PME# supported from D0 D3hot D3cold
[    0.270082] pci 0000:00:17.7: [15ad:07a0] type 01 class 0x060400
[    0.271690] pci 0000:00:17.7: PME# supported from D0 D3hot D3cold
[    0.272173] pci 0000:00:18.0: [15ad:07a0] type 01 class 0x060400
[    0.273142] pci 0000:00:18.0: PME# supported from D0 D3hot D3cold
[    0.273603] pci 0000:00:18.1: [15ad:07a0] type 01 class 0x060400
[    0.274578] pci 0000:00:18.1: PME# supported from D0 D3hot D3cold
[    0.275038] pci 0000:00:18.2: [15ad:07a0] type 01 class 0x060400
[    0.275894] pci 0000:00:18.2: PME# supported from D0 D3hot D3cold
[    0.276234] pci 0000:00:18.3: [15ad:07a0] type 01 class 0x060400
[    0.277090] pci 0000:00:18.3: PME# supported from D0 D3hot D3cold
[    0.277421] pci 0000:00:18.4: [15ad:07a0] type 01 class 0x060400
[    0.278279] pci 0000:00:18.4: PME# supported from D0 D3hot D3cold
[    0.278694] pci 0000:00:18.5: [15ad:07a0] type 01 class 0x060400
[    0.279508] pci 0000:00:18.5: PME# supported from D0 D3hot D3cold
[    0.279839] pci 0000:00:18.6: [15ad:07a0] type 01 class 0x060400
[    0.280731] pci 0000:00:18.6: PME# supported from D0 D3hot D3cold
[    0.281068] pci 0000:00:18.7: [15ad:07a0] type 01 class 0x060400
[    0.281866] pci 0000:00:18.7: PME# supported from D0 D3hot D3cold
[    0.282251] pci_bus 0000:01: extended config space not accessible
[    0.282296] pci 0000:00:01.0: PCI bridge to [bus 01]
[    0.282501] pci_bus 0000:02: extended config space not accessible
[    0.282761] acpiphp: Slot [32] registered
[    0.282795] acpiphp: Slot [33] registered
[    0.282834] acpiphp: Slot [34] registered
[    0.282870] acpiphp: Slot [35] registered
[    0.282905] acpiphp: Slot [36] registered
[    0.282940] acpiphp: Slot [37] registered
[    0.282975] acpiphp: Slot [38] registered
[    0.283010] acpiphp: Slot [39] registered
[    0.283045] acpiphp: Slot [40] registered
[    0.283081] acpiphp: Slot [41] registered
[    0.283116] acpiphp: Slot [42] registered
[    0.283151] acpiphp: Slot [43] registered
[    0.283186] acpiphp: Slot [44] registered
[    0.283221] acpiphp: Slot [45] registered
[    0.283257] acpiphp: Slot [46] registered
[    0.283292] acpiphp: Slot [47] registered
[    0.283327] acpiphp: Slot [48] registered
[    0.283362] acpiphp: Slot [49] registered
[    0.283397] acpiphp: Slot [50] registered
[    0.283432] acpiphp: Slot [51] registered
[    0.283466] acpiphp: Slot [52] registered
[    0.283501] acpiphp: Slot [53] registered
[    0.283586] acpiphp: Slot [54] registered
[    0.283641] acpiphp: Slot [55] registered
[    0.283676] acpiphp: Slot [56] registered
[    0.283711] acpiphp: Slot [57] registered
[    0.283748] acpiphp: Slot [58] registered
[    0.283785] acpiphp: Slot [59] registered
[    0.283818] acpiphp: Slot [60] registered
[    0.283853] acpiphp: Slot [61] registered
[    0.283887] acpiphp: Slot [62] registered
[    0.283922] acpiphp: Slot [63] registered
[    0.283993] pci 0000:02:00.0: [15ad:0774] type 00 class 0x0c0300
[    0.285161] pci 0000:02:00.0: reg 0x20: [io  0x2080-0x209f]
[    0.286530] pci 0000:02:01.0: [8086:100f] type 00 class 0x020000
[    0.287602] pci 0000:02:01.0: reg 0x10: [mem 0xfd5c0000-0xfd5dffff 64bit]
[    0.288253] pci 0000:02:01.0: reg 0x18: [mem 0xfdff0000-0xfdffffff 64bit]
[    0.288793] pci 0000:02:01.0: reg 0x20: [io  0x2000-0x203f]
[    0.289794] pci 0000:02:01.0: reg 0x30: [mem 0x00000000-0x0000ffff pref]
[    0.290153] pci 0000:02:01.0: PME# supported from D0 D3hot D3cold
[    0.290426] pci 0000:02:02.0: [1274:1371] type 00 class 0x040100
[    0.290701] pci 0000:02:02.0: reg 0x10: [io  0x2040-0x207f]
[    0.292457] pci 0000:02:03.0: [15ad:0770] type 00 class 0x0c0320
[    0.292780] pci 0000:02:03.0: reg 0x10: [mem 0xfd5ef000-0xfd5effff]
[    0.294877] pci 0000:00:11.0: PCI bridge to [bus 02] (subtractive decode)
[    0.294898] pci 0000:00:11.0:   bridge window [io  0x2000-0x3fff]
[    0.294917] pci 0000:00:11.0:   bridge window [mem 0xfd500000-0xfdffffff]
[    0.294955] pci 0000:00:11.0:   bridge window [mem 0xe7b00000-0xe7ffffff 64bit pref]
[    0.294957] pci 0000:00:11.0:   bridge window [mem 0x000a0000-0x000bffff window] (subtractive decode)
[    0.294957] pci 0000:00:11.0:   bridge window [mem 0x000cc000-0x000cffff window] (subtractive decode)
[    0.294958] pci 0000:00:11.0:   bridge window [mem 0x000d0000-0x000d3fff window] (subtractive decode)
[    0.294958] pci 0000:00:11.0:   bridge window [mem 0x000d4000-0x000d7fff window] (subtractive decode)
[    0.294959] pci 0000:00:11.0:   bridge window [mem 0x000d8000-0x000dbfff window] (subtractive decode)
[    0.294959] pci 0000:00:11.0:   bridge window [mem 0x80000000-0xfebfffff window] (subtractive decode)
[    0.294960] pci 0000:00:11.0:   bridge window [io  0x0000-0x0cf7 window] (subtractive decode)
[    0.294960] pci 0000:00:11.0:   bridge window [io  0x0d00-0xfeff window] (subtractive decode)
[    0.295266] pci 0000:00:15.0: PCI bridge to [bus 03]
[    0.295285] pci 0000:00:15.0:   bridge window [io  0x4000-0x4fff]
[    0.295305] pci 0000:00:15.0:   bridge window [mem 0xfd400000-0xfd4fffff]
[    0.295343] pci 0000:00:15.0:   bridge window [mem 0xe7a00000-0xe7afffff 64bit pref]
[    0.295683] pci 0000:00:15.1: PCI bridge to [bus 04]
[    0.295703] pci 0000:00:15.1:   bridge window [io  0x8000-0x8fff]
[    0.295722] pci 0000:00:15.1:   bridge window [mem 0xfd000000-0xfd0fffff]
[    0.295760] pci 0000:00:15.1:   bridge window [mem 0xe7600000-0xe76fffff 64bit pref]
[    0.296048] pci 0000:00:15.2: PCI bridge to [bus 05]
[    0.296067] pci 0000:00:15.2:   bridge window [io  0xc000-0xcfff]
[    0.296087] pci 0000:00:15.2:   bridge window [mem 0xfcc00000-0xfccfffff]
[    0.296125] pci 0000:00:15.2:   bridge window [mem 0xe7200000-0xe72fffff 64bit pref]
[    0.296407] pci 0000:00:15.3: PCI bridge to [bus 06]
[    0.296445] pci 0000:00:15.3:   bridge window [mem 0xfc800000-0xfc8fffff]
[    0.296498] pci 0000:00:15.3:   bridge window [mem 0xe6e00000-0xe6efffff 64bit pref]
[    0.296856] pci 0000:00:15.4: PCI bridge to [bus 07]
[    0.296893] pci 0000:00:15.4:   bridge window [mem 0xfc400000-0xfc4fffff]
[    0.296930] pci 0000:00:15.4:   bridge window [mem 0xe6a00000-0xe6afffff 64bit pref]
[    0.297210] pci 0000:00:15.5: PCI bridge to [bus 08]
[    0.297247] pci 0000:00:15.5:   bridge window [mem 0xfc000000-0xfc0fffff]
[    0.297284] pci 0000:00:15.5:   bridge window [mem 0xe6600000-0xe66fffff 64bit pref]
[    0.297622] pci 0000:00:15.6: PCI bridge to [bus 09]
[    0.297677] pci 0000:00:15.6:   bridge window [mem 0xfbc00000-0xfbcfffff]
[    0.297714] pci 0000:00:15.6:   bridge window [mem 0xe6200000-0xe62fffff 64bit pref]
[    0.297990] pci 0000:00:15.7: PCI bridge to [bus 0a]
[    0.298027] pci 0000:00:15.7:   bridge window [mem 0xfb800000-0xfb8fffff]
[    0.298064] pci 0000:00:15.7:   bridge window [mem 0xe5e00000-0xe5efffff 64bit pref]
[    0.298342] pci 0000:00:16.0: PCI bridge to [bus 0b]
[    0.298361] pci 0000:00:16.0:   bridge window [io  0x5000-0x5fff]
[    0.298380] pci 0000:00:16.0:   bridge window [mem 0xfd300000-0xfd3fffff]
[    0.298417] pci 0000:00:16.0:   bridge window [mem 0xe7900000-0xe79fffff 64bit pref]
[    0.298796] pci 0000:00:16.1: PCI bridge to [bus 0c]
[    0.298850] pci 0000:00:16.1:   bridge window [io  0x9000-0x9fff]
[    0.298887] pci 0000:00:16.1:   bridge window [mem 0xfcf00000-0xfcffffff]
[    0.298960] pci 0000:00:16.1:   bridge window [mem 0xe7500000-0xe75fffff 64bit pref]
[    0.299546] pci 0000:00:16.2: PCI bridge to [bus 0d]
[    0.299618] pci 0000:00:16.2:   bridge window [io  0xd000-0xdfff]
[    0.299661] pci 0000:00:16.2:   bridge window [mem 0xfcb00000-0xfcbfffff]
[    0.299704] pci 0000:00:16.2:   bridge window [mem 0xe7100000-0xe71fffff 64bit pref]
[    0.300285] pci 0000:00:16.3: PCI bridge to [bus 0e]
[    0.300340] pci 0000:00:16.3:   bridge window [mem 0xfc700000-0xfc7fffff]
[    0.300429] pci 0000:00:16.3:   bridge window [mem 0xe6d00000-0xe6dfffff 64bit pref]
[    0.301008] pci 0000:00:16.4: PCI bridge to [bus 0f]
[    0.301095] pci 0000:00:16.4:   bridge window [mem 0xfc300000-0xfc3fffff]
[    0.301185] pci 0000:00:16.4:   bridge window [mem 0xe6900000-0xe69fffff 64bit pref]
[    0.301624] pci 0000:00:16.5: PCI bridge to [bus 10]
[    0.301680] pci 0000:00:16.5:   bridge window [mem 0xfbf00000-0xfbffffff]
[    0.301738] pci 0000:00:16.5:   bridge window [mem 0xe6500000-0xe65fffff 64bit pref]
[    0.302132] pci 0000:00:16.6: PCI bridge to [bus 11]
[    0.302171] pci 0000:00:16.6:   bridge window [mem 0xfbb00000-0xfbbfffff]
[    0.302210] pci 0000:00:16.6:   bridge window [mem 0xe6100000-0xe61fffff 64bit pref]
[    0.302633] pci 0000:00:16.7: PCI bridge to [bus 12]
[    0.302687] pci 0000:00:16.7:   bridge window [mem 0xfb700000-0xfb7fffff]
[    0.302758] pci 0000:00:16.7:   bridge window [mem 0xe5d00000-0xe5dfffff 64bit pref]
[    0.303134] pci 0000:00:17.0: PCI bridge to [bus 13]
[    0.303154] pci 0000:00:17.0:   bridge window [io  0x6000-0x6fff]
[    0.303174] pci 0000:00:17.0:   bridge window [mem 0xfd200000-0xfd2fffff]
[    0.303231] pci 0000:00:17.0:   bridge window [mem 0xe7800000-0xe78fffff 64bit pref]
[    0.303659] pci 0000:00:17.1: PCI bridge to [bus 14]
[    0.303678] pci 0000:00:17.1:   bridge window [io  0xa000-0xafff]
[    0.303716] pci 0000:00:17.1:   bridge window [mem 0xfce00000-0xfcefffff]
[    0.303773] pci 0000:00:17.1:   bridge window [mem 0xe7400000-0xe74fffff 64bit pref]
[    0.304225] pci 0000:00:17.2: PCI bridge to [bus 15]
[    0.304244] pci 0000:00:17.2:   bridge window [io  0xe000-0xefff]
[    0.304264] pci 0000:00:17.2:   bridge window [mem 0xfca00000-0xfcafffff]
[    0.304304] pci 0000:00:17.2:   bridge window [mem 0xe7000000-0xe70fffff 64bit pref]
[    0.304690] pci 0000:00:17.3: PCI bridge to [bus 16]
[    0.304729] pci 0000:00:17.3:   bridge window [mem 0xfc600000-0xfc6fffff]
[    0.304767] pci 0000:00:17.3:   bridge window [mem 0xe6c00000-0xe6cfffff 64bit pref]
[    0.305063] pci 0000:00:17.4: PCI bridge to [bus 17]
[    0.305101] pci 0000:00:17.4:   bridge window [mem 0xfc200000-0xfc2fffff]
[    0.305140] pci 0000:00:17.4:   bridge window [mem 0xe6800000-0xe68fffff 64bit pref]
[    0.305446] pci 0000:00:17.5: PCI bridge to [bus 18]
[    0.305485] pci 0000:00:17.5:   bridge window [mem 0xfbe00000-0xfbefffff]
[    0.305523] pci 0000:00:17.5:   bridge window [mem 0xe6400000-0xe64fffff 64bit pref]
[    0.305852] pci 0000:00:17.6: PCI bridge to [bus 19]
[    0.305907] pci 0000:00:17.6:   bridge window [mem 0xfba00000-0xfbafffff]
[    0.305945] pci 0000:00:17.6:   bridge window [mem 0xe6000000-0xe60fffff 64bit pref]
[    0.306238] pci 0000:00:17.7: PCI bridge to [bus 1a]
[    0.306292] pci 0000:00:17.7:   bridge window [mem 0xfb600000-0xfb6fffff]
[    0.306365] pci 0000:00:17.7:   bridge window [mem 0xe5c00000-0xe5cfffff 64bit pref]
[    0.306695] pci 0000:00:18.0: PCI bridge to [bus 1b]
[    0.306715] pci 0000:00:18.0:   bridge window [io  0x7000-0x7fff]
[    0.306735] pci 0000:00:18.0:   bridge window [mem 0xfd100000-0xfd1fffff]
[    0.306774] pci 0000:00:18.0:   bridge window [mem 0xe7700000-0xe77fffff 64bit pref]
[    0.307066] pci 0000:00:18.1: PCI bridge to [bus 1c]
[    0.307086] pci 0000:00:18.1:   bridge window [io  0xb000-0xbfff]
[    0.307106] pci 0000:00:18.1:   bridge window [mem 0xfcd00000-0xfcdfffff]
[    0.307145] pci 0000:00:18.1:   bridge window [mem 0xe7300000-0xe73fffff 64bit pref]
[    0.307457] pci 0000:00:18.2: PCI bridge to [bus 1d]
[    0.307495] pci 0000:00:18.2:   bridge window [mem 0xfc900000-0xfc9fffff]
[    0.307532] pci 0000:00:18.2:   bridge window [mem 0xe6f00000-0xe6ffffff 64bit pref]
[    0.307796] pci 0000:00:18.3: PCI bridge to [bus 1e]
[    0.307834] pci 0000:00:18.3:   bridge window [mem 0xfc500000-0xfc5fffff]
[    0.307872] pci 0000:00:18.3:   bridge window [mem 0xe6b00000-0xe6bfffff 64bit pref]
[    0.308156] pci 0000:00:18.4: PCI bridge to [bus 1f]
[    0.308193] pci 0000:00:18.4:   bridge window [mem 0xfc100000-0xfc1fffff]
[    0.308231] pci 0000:00:18.4:   bridge window [mem 0xe6700000-0xe67fffff 64bit pref]
[    0.308573] pci 0000:00:18.5: PCI bridge to [bus 20]
[    0.308611] pci 0000:00:18.5:   bridge window [mem 0xfbd00000-0xfbdfffff]
[    0.308649] pci 0000:00:18.5:   bridge window [mem 0xe6300000-0xe63fffff 64bit pref]
[    0.308933] pci 0000:00:18.6: PCI bridge to [bus 21]
[    0.308971] pci 0000:00:18.6:   bridge window [mem 0xfb900000-0xfb9fffff]
[    0.309009] pci 0000:00:18.6:   bridge window [mem 0xe5f00000-0xe5ffffff 64bit pref]
[    0.309297] pci 0000:00:18.7: PCI bridge to [bus 22]
[    0.309394] pci 0000:00:18.7:   bridge window [mem 0xfb500000-0xfb5fffff]
[    0.309433] pci 0000:00:18.7:   bridge window [mem 0xe5b00000-0xe5bfffff 64bit pref]
[    0.311969] ACPI: PCI Interrupt Link [LNKA] (IRQs 3 4 5 6 7 *9 10 11 14 15)
[    0.312032] ACPI: PCI Interrupt Link [LNKB] (IRQs 3 4 5 6 7 9 10 *11 14 15)
[    0.312092] ACPI: PCI Interrupt Link [LNKC] (IRQs 3 4 5 6 7 9 *10 11 14 15)
[    0.312152] ACPI: PCI Interrupt Link [LNKD] (IRQs 3 4 5 6 *7 9 10 11 14 15)
[    0.322817] pci 0000:00:0f.0: vgaarb: setting as boot VGA device
[    0.322819] pci 0000:00:0f.0: vgaarb: VGA device added: decodes=io+mem,owns=io+mem,locks=none
[    0.322828] pci 0000:00:0f.0: vgaarb: bridge control possible
[    0.322829] vgaarb: loaded
[    0.323053] SCSI subsystem initialized
[    0.323072] ACPI: bus type USB registered
[    0.323129] usbcore: registered new interface driver usbfs
[    0.323158] usbcore: registered new interface driver hub
[    0.323243] usbcore: registered new device driver usb
[    0.323278] pps_core: LinuxPPS API ver. 1 registered
[    0.323279] pps_core: Software ver. 5.3.6 - Copyright 2005-2007 Rodolfo Giometti <giometti@linux.it>
[    0.323280] PTP clock support registered
[    0.323349] EDAC MC: Ver: 3.0.0
[    0.324740] PCI: Using ACPI for IRQ routing
[    0.326789] PCI: pci_cache_line_size set to 64 bytes
[    0.327631] e820: reserve RAM buffer [mem 0x0009ec00-0x0009ffff]
[    0.327632] e820: reserve RAM buffer [mem 0x7fee0000-0x7fffffff]
[    0.327753] NetLabel: Initializing
[    0.327754] NetLabel:  domain hash size = 128
[    0.327754] NetLabel:  protocols = UNLABELED CIPSOv4 CALIPSO
[    0.327762] NetLabel:  unlabeled traffic allowed by default
[    0.327882] hpet0: at MMIO 0xfed00000, IRQs 2, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
[    0.327885] hpet0: 16 comparators, 64-bit 14.318180 MHz counter
[    0.329839] clocksource: Switched to clocksource tsc-early
[    0.341977] VFS: Disk quotas dquot_6.6.0
[    0.342004] VFS: Dquot-cache hash table entries: 512 (order 0, 4096 bytes)
[    0.342086] pnp: PnP ACPI init
[    0.342245] system 00:00: [io  0x1000-0x103f] has been reserved
[    0.342246] system 00:00: [io  0x1040-0x104f] has been reserved
[    0.342247] system 00:00: [io  0x0cf0-0x0cf1] has been reserved
[    0.342250] system 00:00: Plug and Play ACPI device, IDs PNP0c02 (active)
[    0.342314] pnp 00:01: Plug and Play ACPI device, IDs PNP0b00 (active)
[    0.342354] pnp 00:02: Plug and Play ACPI device, IDs PNP0303 (active)
[    0.342368] pnp 00:03: Plug and Play ACPI device, IDs VMW0003 PNP0f13 (active)
[    0.342544] system 00:04: [mem 0xfed00000-0xfed003ff] has been reserved
[    0.342546] system 00:04: Plug and Play ACPI device, IDs PNP0103 PNP0c01 (active)
[    0.343706] pnp 00:05: Plug and Play ACPI device, IDs PNP0501 (active)
[    0.343860] pnp 00:06: Plug and Play ACPI device, IDs PNP0501 (active)
[    0.344085] system 00:07: [io  0xfce0-0xfcff] has been reserved
[    0.344086] system 00:07: [mem 0xf0000000-0xf7ffffff] has been reserved
[    0.344088] system 00:07: [mem 0xfe800000-0xfe9fffff] has been reserved
[    0.344090] system 00:07: Plug and Play ACPI device, IDs PNP0c02 (active)
[    0.348693] pnp: PnP ACPI: found 8 devices
[    0.359494] clocksource: acpi_pm: mask: 0xffffff max_cycles: 0xffffff, max_idle_ns: 2085701024 ns
[    0.359505] pci 0000:00:15.3: bridge window [io  0x1000-0x0fff] to [bus 06] add_size 1000
[    0.359506] pci 0000:00:15.4: bridge window [io  0x1000-0x0fff] to [bus 07] add_size 1000
[    0.359507] pci 0000:00:15.5: bridge window [io  0x1000-0x0fff] to [bus 08] add_size 1000
[    0.359508] pci 0000:00:15.6: bridge window [io  0x1000-0x0fff] to [bus 09] add_size 1000
[    0.359509] pci 0000:00:15.7: bridge window [io  0x1000-0x0fff] to [bus 0a] add_size 1000
[    0.359510] pci 0000:00:16.3: bridge window [io  0x1000-0x0fff] to [bus 0e] add_size 1000
[    0.359511] pci 0000:00:16.4: bridge window [io  0x1000-0x0fff] to [bus 0f] add_size 1000
[    0.359512] pci 0000:00:16.5: bridge window [io  0x1000-0x0fff] to [bus 10] add_size 1000
[    0.359513] pci 0000:00:16.6: bridge window [io  0x1000-0x0fff] to [bus 11] add_size 1000
[    0.359514] pci 0000:00:16.7: bridge window [io  0x1000-0x0fff] to [bus 12] add_size 1000
[    0.359515] pci 0000:00:17.3: bridge window [io  0x1000-0x0fff] to [bus 16] add_size 1000
[    0.359516] pci 0000:00:17.4: bridge window [io  0x1000-0x0fff] to [bus 17] add_size 1000
[    0.359517] pci 0000:00:17.5: bridge window [io  0x1000-0x0fff] to [bus 18] add_size 1000
[    0.359518] pci 0000:00:17.6: bridge window [io  0x1000-0x0fff] to [bus 19] add_size 1000
[    0.359518] pci 0000:00:17.7: bridge window [io  0x1000-0x0fff] to [bus 1a] add_size 1000
[    0.359520] pci 0000:00:18.2: bridge window [io  0x1000-0x0fff] to [bus 1d] add_size 1000
[    0.359521] pci 0000:00:18.3: bridge window [io  0x1000-0x0fff] to [bus 1e] add_size 1000
[    0.359521] pci 0000:00:18.4: bridge window [io  0x1000-0x0fff] to [bus 1f] add_size 1000
[    0.359522] pci 0000:00:18.5: bridge window [io  0x1000-0x0fff] to [bus 20] add_size 1000
[    0.359523] pci 0000:00:18.6: bridge window [io  0x1000-0x0fff] to [bus 21] add_size 1000
[    0.359523] pci 0000:00:18.7: bridge window [io  0x1000-0x0fff] to [bus 22] add_size 1000
[    0.359537] pci 0000:00:0f.0: BAR 6: assigned [mem 0x80000000-0x80007fff pref]
[    0.359538] pci 0000:00:10.0: BAR 6: assigned [mem 0x80008000-0x8000bfff pref]
[    0.359541] pci 0000:00:15.3: BAR 13: no space for [io  size 0x1000]
[    0.359541] pci 0000:00:15.3: BAR 13: failed to assign [io  size 0x1000]
[    0.359543] pci 0000:00:15.4: BAR 13: no space for [io  size 0x1000]
[    0.359543] pci 0000:00:15.4: BAR 13: failed to assign [io  size 0x1000]
[    0.359545] pci 0000:00:15.5: BAR 13: no space for [io  size 0x1000]
[    0.359545] pci 0000:00:15.5: BAR 13: failed to assign [io  size 0x1000]
[    0.359546] pci 0000:00:15.6: BAR 13: no space for [io  size 0x1000]
[    0.359547] pci 0000:00:15.6: BAR 13: failed to assign [io  size 0x1000]
[    0.359548] pci 0000:00:15.7: BAR 13: no space for [io  size 0x1000]
[    0.359548] pci 0000:00:15.7: BAR 13: failed to assign [io  size 0x1000]
[    0.359549] pci 0000:00:16.3: BAR 13: no space for [io  size 0x1000]
[    0.359550] pci 0000:00:16.3: BAR 13: failed to assign [io  size 0x1000]
[    0.359552] pci 0000:00:16.4: BAR 13: no space for [io  size 0x1000]
[    0.359552] pci 0000:00:16.4: BAR 13: failed to assign [io  size 0x1000]
[    0.359553] pci 0000:00:16.5: BAR 13: no space for [io  size 0x1000]
[    0.359554] pci 0000:00:16.5: BAR 13: failed to assign [io  size 0x1000]
[    0.359555] pci 0000:00:16.6: BAR 13: no space for [io  size 0x1000]
[    0.359555] pci 0000:00:16.6: BAR 13: failed to assign [io  size 0x1000]
[    0.359556] pci 0000:00:16.7: BAR 13: no space for [io  size 0x1000]
[    0.359557] pci 0000:00:16.7: BAR 13: failed to assign [io  size 0x1000]
[    0.359558] pci 0000:00:17.3: BAR 13: no space for [io  size 0x1000]
[    0.359558] pci 0000:00:17.3: BAR 13: failed to assign [io  size 0x1000]
[    0.359559] pci 0000:00:17.4: BAR 13: no space for [io  size 0x1000]
[    0.359560] pci 0000:00:17.4: BAR 13: failed to assign [io  size 0x1000]
[    0.359561] pci 0000:00:17.5: BAR 13: no space for [io  size 0x1000]
[    0.359561] pci 0000:00:17.5: BAR 13: failed to assign [io  size 0x1000]
[    0.359563] pci 0000:00:17.6: BAR 13: no space for [io  size 0x1000]
[    0.359563] pci 0000:00:17.6: BAR 13: failed to assign [io  size 0x1000]
[    0.359564] pci 0000:00:17.7: BAR 13: no space for [io  size 0x1000]
[    0.359565] pci 0000:00:17.7: BAR 13: failed to assign [io  size 0x1000]
[    0.359566] pci 0000:00:18.2: BAR 13: no space for [io  size 0x1000]
[    0.359566] pci 0000:00:18.2: BAR 13: failed to assign [io  size 0x1000]
[    0.359567] pci 0000:00:18.3: BAR 13: no space for [io  size 0x1000]
[    0.359568] pci 0000:00:18.3: BAR 13: failed to assign [io  size 0x1000]
[    0.359569] pci 0000:00:18.4: BAR 13: no space for [io  size 0x1000]
[    0.359569] pci 0000:00:18.4: BAR 13: failed to assign [io  size 0x1000]
[    0.359570] pci 0000:00:18.5: BAR 13: no space for [io  size 0x1000]
[    0.359571] pci 0000:00:18.5: BAR 13: failed to assign [io  size 0x1000]
[    0.359572] pci 0000:00:18.6: BAR 13: no space for [io  size 0x1000]
[    0.359572] pci 0000:00:18.6: BAR 13: failed to assign [io  size 0x1000]
[    0.359573] pci 0000:00:18.7: BAR 13: no space for [io  size 0x1000]
[    0.359574] pci 0000:00:18.7: BAR 13: failed to assign [io  size 0x1000]
[    0.359577] pci 0000:00:18.7: BAR 13: no space for [io  size 0x1000]
[    0.359577] pci 0000:00:18.7: BAR 13: failed to assign [io  size 0x1000]
[    0.359578] pci 0000:00:18.6: BAR 13: no space for [io  size 0x1000]
[    0.359579] pci 0000:00:18.6: BAR 13: failed to assign [io  size 0x1000]
[    0.359580] pci 0000:00:18.5: BAR 13: no space for [io  size 0x1000]
[    0.359580] pci 0000:00:18.5: BAR 13: failed to assign [io  size 0x1000]
[    0.359581] pci 0000:00:18.4: BAR 13: no space for [io  size 0x1000]
[    0.359582] pci 0000:00:18.4: BAR 13: failed to assign [io  size 0x1000]
[    0.359583] pci 0000:00:18.3: BAR 13: no space for [io  size 0x1000]
[    0.359583] pci 0000:00:18.3: BAR 13: failed to assign [io  size 0x1000]
[    0.359585] pci 0000:00:18.2: BAR 13: no space for [io  size 0x1000]
[    0.359585] pci 0000:00:18.2: BAR 13: failed to assign [io  size 0x1000]
[    0.359586] pci 0000:00:17.7: BAR 13: no space for [io  size 0x1000]
[    0.359587] pci 0000:00:17.7: BAR 13: failed to assign [io  size 0x1000]
[    0.359588] pci 0000:00:17.6: BAR 13: no space for [io  size 0x1000]
[    0.359588] pci 0000:00:17.6: BAR 13: failed to assign [io  size 0x1000]
[    0.359589] pci 0000:00:17.5: BAR 13: no space for [io  size 0x1000]
[    0.359590] pci 0000:00:17.5: BAR 13: failed to assign [io  size 0x1000]
[    0.359591] pci 0000:00:17.4: BAR 13: no space for [io  size 0x1000]
[    0.359591] pci 0000:00:17.4: BAR 13: failed to assign [io  size 0x1000]
[    0.359592] pci 0000:00:17.3: BAR 13: no space for [io  size 0x1000]
[    0.359593] pci 0000:00:17.3: BAR 13: failed to assign [io  size 0x1000]
[    0.359594] pci 0000:00:16.7: BAR 13: no space for [io  size 0x1000]
[    0.359595] pci 0000:00:16.7: BAR 13: failed to assign [io  size 0x1000]
[    0.359596] pci 0000:00:16.6: BAR 13: no space for [io  size 0x1000]
[    0.359596] pci 0000:00:16.6: BAR 13: failed to assign [io  size 0x1000]
[    0.359597] pci 0000:00:16.5: BAR 13: no space for [io  size 0x1000]
[    0.359598] pci 0000:00:16.5: BAR 13: failed to assign [io  size 0x1000]
[    0.359599] pci 0000:00:16.4: BAR 13: no space for [io  size 0x1000]
[    0.359599] pci 0000:00:16.4: BAR 13: failed to assign [io  size 0x1000]
[    0.359600] pci 0000:00:16.3: BAR 13: no space for [io  size 0x1000]
[    0.359601] pci 0000:00:16.3: BAR 13: failed to assign [io  size 0x1000]
[    0.359602] pci 0000:00:15.7: BAR 13: no space for [io  size 0x1000]
[    0.359602] pci 0000:00:15.7: BAR 13: failed to assign [io  size 0x1000]
[    0.359603] pci 0000:00:15.6: BAR 13: no space for [io  size 0x1000]
[    0.359604] pci 0000:00:15.6: BAR 13: failed to assign [io  size 0x1000]
[    0.359605] pci 0000:00:15.5: BAR 13: no space for [io  size 0x1000]
[    0.359605] pci 0000:00:15.5: BAR 13: failed to assign [io  size 0x1000]
[    0.359607] pci 0000:00:15.4: BAR 13: no space for [io  size 0x1000]
[    0.359607] pci 0000:00:15.4: BAR 13: failed to assign [io  size 0x1000]
[    0.359608] pci 0000:00:15.3: BAR 13: no space for [io  size 0x1000]
[    0.359609] pci 0000:00:15.3: BAR 13: failed to assign [io  size 0x1000]
[    0.359610] pci 0000:00:01.0: PCI bridge to [bus 01]
[    0.359703] pci 0000:02:01.0: BAR 6: assigned [mem 0xfd500000-0xfd50ffff pref]
[    0.359704] pci 0000:00:11.0: PCI bridge to [bus 02]
[    0.359717] pci 0000:00:11.0:   bridge window [io  0x2000-0x3fff]
[    0.359746] pci 0000:00:11.0:   bridge window [mem 0xfd500000-0xfdffffff]
[    0.359765] pci 0000:00:11.0:   bridge window [mem 0xe7b00000-0xe7ffffff 64bit pref]
[    0.359810] pci 0000:00:15.0: PCI bridge to [bus 03]
[    0.359820] pci 0000:00:15.0:   bridge window [io  0x4000-0x4fff]
[    0.359849] pci 0000:00:15.0:   bridge window [mem 0xfd400000-0xfd4fffff]
[    0.359868] pci 0000:00:15.0:   bridge window [mem 0xe7a00000-0xe7afffff 64bit pref]
[    0.359940] pci 0000:00:15.1: PCI bridge to [bus 04]
[    0.359952] pci 0000:00:15.1:   bridge window [io  0x8000-0x8fff]
[    0.359980] pci 0000:00:15.1:   bridge window [mem 0xfd000000-0xfd0fffff]
[    0.360000] pci 0000:00:15.1:   bridge window [mem 0xe7600000-0xe76fffff 64bit pref]
[    0.360059] pci 0000:00:15.2: PCI bridge to [bus 05]
[    0.360070] pci 0000:00:15.2:   bridge window [io  0xc000-0xcfff]
[    0.360099] pci 0000:00:15.2:   bridge window [mem 0xfcc00000-0xfccfffff]
[    0.360118] pci 0000:00:15.2:   bridge window [mem 0xe7200000-0xe72fffff 64bit pref]
[    0.360167] pci 0000:00:15.3: PCI bridge to [bus 06]
[    0.360197] pci 0000:00:15.3:   bridge window [mem 0xfc800000-0xfc8fffff]
[    0.360217] pci 0000:00:15.3:   bridge window [mem 0xe6e00000-0xe6efffff 64bit pref]
[    0.360288] pci 0000:00:15.4: PCI bridge to [bus 07]
[    0.360321] pci 0000:00:15.4:   bridge window [mem 0xfc400000-0xfc4fffff]
[    0.360361] pci 0000:00:15.4:   bridge window [mem 0xe6a00000-0xe6afffff 64bit pref]
[    0.360412] pci 0000:00:15.5: PCI bridge to [bus 08]
[    0.360460] pci 0000:00:15.5:   bridge window [mem 0xfc000000-0xfc0fffff]
[    0.360498] pci 0000:00:15.5:   bridge window [mem 0xe6600000-0xe66fffff 64bit pref]
[    0.360601] pci 0000:00:15.6: PCI bridge to [bus 09]
[    0.360632] pci 0000:00:15.6:   bridge window [mem 0xfbc00000-0xfbcfffff]
[    0.360686] pci 0000:00:15.6:   bridge window [mem 0xe6200000-0xe62fffff 64bit pref]
[    0.360790] pci 0000:00:15.7: PCI bridge to [bus 0a]
[    0.360826] pci 0000:00:15.7:   bridge window [mem 0xfb800000-0xfb8fffff]
[    0.360846] pci 0000:00:15.7:   bridge window [mem 0xe5e00000-0xe5efffff 64bit pref]
[    0.360896] pci 0000:00:16.0: PCI bridge to [bus 0b]
[    0.360926] pci 0000:00:16.0:   bridge window [io  0x5000-0x5fff]
[    0.360973] pci 0000:00:16.0:   bridge window [mem 0xfd300000-0xfd3fffff]
[    0.360993] pci 0000:00:16.0:   bridge window [mem 0xe7900000-0xe79fffff 64bit pref]
[    0.361060] pci 0000:00:16.1: PCI bridge to [bus 0c]
[    0.361071] pci 0000:00:16.1:   bridge window [io  0x9000-0x9fff]
[    0.361118] pci 0000:00:16.1:   bridge window [mem 0xfcf00000-0xfcffffff]
[    0.361139] pci 0000:00:16.1:   bridge window [mem 0xe7500000-0xe75fffff 64bit pref]
[    0.361218] pci 0000:00:16.2: PCI bridge to [bus 0d]
[    0.361257] pci 0000:00:16.2:   bridge window [io  0xd000-0xdfff]
[    0.361291] pci 0000:00:16.2:   bridge window [mem 0xfcb00000-0xfcbfffff]
[    0.361328] pci 0000:00:16.2:   bridge window [mem 0xe7100000-0xe71fffff 64bit pref]
[    0.361403] pci 0000:00:16.3: PCI bridge to [bus 0e]
[    0.361433] pci 0000:00:16.3:   bridge window [mem 0xfc700000-0xfc7fffff]
[    0.361454] pci 0000:00:16.3:   bridge window [mem 0xe6d00000-0xe6dfffff 64bit pref]
[    0.361504] pci 0000:00:16.4: PCI bridge to [bus 0f]
[    0.361552] pci 0000:00:16.4:   bridge window [mem 0xfc300000-0xfc3fffff]
[    0.361572] pci 0000:00:16.4:   bridge window [mem 0xe6900000-0xe69fffff 64bit pref]
[    0.361657] pci 0000:00:16.5: PCI bridge to [bus 10]
[    0.361707] pci 0000:00:16.5:   bridge window [mem 0xfbf00000-0xfbffffff]
[    0.361727] pci 0000:00:16.5:   bridge window [mem 0xe6500000-0xe65fffff 64bit pref]
[    0.361799] pci 0000:00:16.6: PCI bridge to [bus 11]
[    0.361829] pci 0000:00:16.6:   bridge window [mem 0xfbb00000-0xfbbfffff]
[    0.361848] pci 0000:00:16.6:   bridge window [mem 0xe6100000-0xe61fffff 64bit pref]
[    0.361897] pci 0000:00:16.7: PCI bridge to [bus 12]
[    0.361927] pci 0000:00:16.7:   bridge window [mem 0xfb700000-0xfb7fffff]
[    0.361947] pci 0000:00:16.7:   bridge window [mem 0xe5d00000-0xe5dfffff 64bit pref]
[    0.361995] pci 0000:00:17.0: PCI bridge to [bus 13]
[    0.362006] pci 0000:00:17.0:   bridge window [io  0x6000-0x6fff]
[    0.362035] pci 0000:00:17.0:   bridge window [mem 0xfd200000-0xfd2fffff]
[    0.362054] pci 0000:00:17.0:   bridge window [mem 0xe7800000-0xe78fffff 64bit pref]
[    0.362122] pci 0000:00:17.1: PCI bridge to [bus 14]
[    0.362133] pci 0000:00:17.1:   bridge window [io  0xa000-0xafff]
[    0.362163] pci 0000:00:17.1:   bridge window [mem 0xfce00000-0xfcefffff]
[    0.362182] pci 0000:00:17.1:   bridge window [mem 0xe7400000-0xe74fffff 64bit pref]
[    0.362290] pci 0000:00:17.2: PCI bridge to [bus 15]
[    0.362306] pci 0000:00:17.2:   bridge window [io  0xe000-0xefff]
[    0.362336] pci 0000:00:17.2:   bridge window [mem 0xfca00000-0xfcafffff]
[    0.362356] pci 0000:00:17.2:   bridge window [mem 0xe7000000-0xe70fffff 64bit pref]
[    0.362464] pci 0000:00:17.3: PCI bridge to [bus 16]
[    0.362495] pci 0000:00:17.3:   bridge window [mem 0xfc600000-0xfc6fffff]
[    0.362549] pci 0000:00:17.3:   bridge window [mem 0xe6c00000-0xe6cfffff 64bit pref]
[    0.362617] pci 0000:00:17.4: PCI bridge to [bus 17]
[    0.362648] pci 0000:00:17.4:   bridge window [mem 0xfc200000-0xfc2fffff]
[    0.362702] pci 0000:00:17.4:   bridge window [mem 0xe6800000-0xe68fffff 64bit pref]
[    0.362751] pci 0000:00:17.5: PCI bridge to [bus 18]
[    0.362804] pci 0000:00:17.5:   bridge window [mem 0xfbe00000-0xfbefffff]
[    0.362842] pci 0000:00:17.5:   bridge window [mem 0xe6400000-0xe64fffff 64bit pref]
[    0.362919] pci 0000:00:17.6: PCI bridge to [bus 19]
[    0.362949] pci 0000:00:17.6:   bridge window [mem 0xfba00000-0xfbafffff]
[    0.362969] pci 0000:00:17.6:   bridge window [mem 0xe6000000-0xe60fffff 64bit pref]
[    0.363037] pci 0000:00:17.7: PCI bridge to [bus 1a]
[    0.363102] pci 0000:00:17.7:   bridge window [mem 0xfb600000-0xfb6fffff]
[    0.363139] pci 0000:00:17.7:   bridge window [mem 0xe5c00000-0xe5cfffff 64bit pref]
[    0.363189] pci 0000:00:18.0: PCI bridge to [bus 1b]
[    0.363211] pci 0000:00:18.0:   bridge window [io  0x7000-0x7fff]
[    0.363260] pci 0000:00:18.0:   bridge window [mem 0xfd100000-0xfd1fffff]
[    0.363309] pci 0000:00:18.0:   bridge window [mem 0xe7700000-0xe77fffff 64bit pref]
[    0.363387] pci 0000:00:18.1: PCI bridge to [bus 1c]
[    0.363405] pci 0000:00:18.1:   bridge window [io  0xb000-0xbfff]
[    0.363437] pci 0000:00:18.1:   bridge window [mem 0xfcd00000-0xfcdfffff]
[    0.363475] pci 0000:00:18.1:   bridge window [mem 0xe7300000-0xe73fffff 64bit pref]
[    0.363530] pci 0000:00:18.2: PCI bridge to [bus 1d]
[    0.363561] pci 0000:00:18.2:   bridge window [mem 0xfc900000-0xfc9fffff]
[    0.363581] pci 0000:00:18.2:   bridge window [mem 0xe6f00000-0xe6ffffff 64bit pref]
[    0.363631] pci 0000:00:18.3: PCI bridge to [bus 1e]
[    0.363661] pci 0000:00:18.3:   bridge window [mem 0xfc500000-0xfc5fffff]
[    0.363681] pci 0000:00:18.3:   bridge window [mem 0xe6b00000-0xe6bfffff 64bit pref]
[    0.363732] pci 0000:00:18.4: PCI bridge to [bus 1f]
[    0.363762] pci 0000:00:18.4:   bridge window [mem 0xfc100000-0xfc1fffff]
[    0.363782] pci 0000:00:18.4:   bridge window [mem 0xe6700000-0xe67fffff 64bit pref]
[    0.363839] pci 0000:00:18.5: PCI bridge to [bus 20]
[    0.363870] pci 0000:00:18.5:   bridge window [mem 0xfbd00000-0xfbdfffff]
[    0.363889] pci 0000:00:18.5:   bridge window [mem 0xe6300000-0xe63fffff 64bit pref]
[    0.363939] pci 0000:00:18.6: PCI bridge to [bus 21]
[    0.363969] pci 0000:00:18.6:   bridge window [mem 0xfb900000-0xfb9fffff]
[    0.363989] pci 0000:00:18.6:   bridge window [mem 0xe5f00000-0xe5ffffff 64bit pref]
[    0.364045] pci 0000:00:18.7: PCI bridge to [bus 22]
[    0.364075] pci 0000:00:18.7:   bridge window [mem 0xfb500000-0xfb5fffff]
[    0.364095] pci 0000:00:18.7:   bridge window [mem 0xe5b00000-0xe5bfffff 64bit pref]
[    0.364149] pci_bus 0000:00: resource 4 [mem 0x000a0000-0x000bffff window]
[    0.364150] pci_bus 0000:00: resource 5 [mem 0x000cc000-0x000cffff window]
[    0.364151] pci_bus 0000:00: resource 6 [mem 0x000d0000-0x000d3fff window]
[    0.364151] pci_bus 0000:00: resource 7 [mem 0x000d4000-0x000d7fff window]
[    0.364152] pci_bus 0000:00: resource 8 [mem 0x000d8000-0x000dbfff window]
[    0.364153] pci_bus 0000:00: resource 9 [mem 0x80000000-0xfebfffff window]
[    0.364153] pci_bus 0000:00: resource 10 [io  0x0000-0x0cf7 window]
[    0.364154] pci_bus 0000:00: resource 11 [io  0x0d00-0xfeff window]
[    0.364155] pci_bus 0000:02: resource 0 [io  0x2000-0x3fff]
[    0.364156] pci_bus 0000:02: resource 1 [mem 0xfd500000-0xfdffffff]
[    0.364157] pci_bus 0000:02: resource 2 [mem 0xe7b00000-0xe7ffffff 64bit pref]
[    0.364157] pci_bus 0000:02: resource 4 [mem 0x000a0000-0x000bffff window]
[    0.364158] pci_bus 0000:02: resource 5 [mem 0x000cc000-0x000cffff window]
[    0.364158] pci_bus 0000:02: resource 6 [mem 0x000d0000-0x000d3fff window]
[    0.364159] pci_bus 0000:02: resource 7 [mem 0x000d4000-0x000d7fff window]
[    0.364159] pci_bus 0000:02: resource 8 [mem 0x000d8000-0x000dbfff window]
[    0.364160] pci_bus 0000:02: resource 9 [mem 0x80000000-0xfebfffff window]
[    0.364161] pci_bus 0000:02: resource 10 [io  0x0000-0x0cf7 window]
[    0.364161] pci_bus 0000:02: resource 11 [io  0x0d00-0xfeff window]
[    0.364162] pci_bus 0000:03: resource 0 [io  0x4000-0x4fff]
[    0.364163] pci_bus 0000:03: resource 1 [mem 0xfd400000-0xfd4fffff]
[    0.364163] pci_bus 0000:03: resource 2 [mem 0xe7a00000-0xe7afffff 64bit pref]
[    0.364164] pci_bus 0000:04: resource 0 [io  0x8000-0x8fff]
[    0.364164] pci_bus 0000:04: resource 1 [mem 0xfd000000-0xfd0fffff]
[    0.364165] pci_bus 0000:04: resource 2 [mem 0xe7600000-0xe76fffff 64bit pref]
[    0.364166] pci_bus 0000:05: resource 0 [io  0xc000-0xcfff]
[    0.364166] pci_bus 0000:05: resource 1 [mem 0xfcc00000-0xfccfffff]
[    0.364167] pci_bus 0000:05: resource 2 [mem 0xe7200000-0xe72fffff 64bit pref]
[    0.364167] pci_bus 0000:06: resource 1 [mem 0xfc800000-0xfc8fffff]
[    0.364168] pci_bus 0000:06: resource 2 [mem 0xe6e00000-0xe6efffff 64bit pref]
[    0.364168] pci_bus 0000:07: resource 1 [mem 0xfc400000-0xfc4fffff]
[    0.364169] pci_bus 0000:07: resource 2 [mem 0xe6a00000-0xe6afffff 64bit pref]
[    0.364170] pci_bus 0000:08: resource 1 [mem 0xfc000000-0xfc0fffff]
[    0.364170] pci_bus 0000:08: resource 2 [mem 0xe6600000-0xe66fffff 64bit pref]
[    0.364171] pci_bus 0000:09: resource 1 [mem 0xfbc00000-0xfbcfffff]
[    0.364171] pci_bus 0000:09: resource 2 [mem 0xe6200000-0xe62fffff 64bit pref]
[    0.364172] pci_bus 0000:0a: resource 1 [mem 0xfb800000-0xfb8fffff]
[    0.364173] pci_bus 0000:0a: resource 2 [mem 0xe5e00000-0xe5efffff 64bit pref]
[    0.364173] pci_bus 0000:0b: resource 0 [io  0x5000-0x5fff]
[    0.364174] pci_bus 0000:0b: resource 1 [mem 0xfd300000-0xfd3fffff]
[    0.364174] pci_bus 0000:0b: resource 2 [mem 0xe7900000-0xe79fffff 64bit pref]
[    0.364175] pci_bus 0000:0c: resource 0 [io  0x9000-0x9fff]
[    0.364176] pci_bus 0000:0c: resource 1 [mem 0xfcf00000-0xfcffffff]
[    0.364176] pci_bus 0000:0c: resource 2 [mem 0xe7500000-0xe75fffff 64bit pref]
[    0.364177] pci_bus 0000:0d: resource 0 [io  0xd000-0xdfff]
[    0.364177] pci_bus 0000:0d: resource 1 [mem 0xfcb00000-0xfcbfffff]
[    0.364178] pci_bus 0000:0d: resource 2 [mem 0xe7100000-0xe71fffff 64bit pref]
[    0.364178] pci_bus 0000:0e: resource 1 [mem 0xfc700000-0xfc7fffff]
[    0.364179] pci_bus 0000:0e: resource 2 [mem 0xe6d00000-0xe6dfffff 64bit pref]
[    0.364180] pci_bus 0000:0f: resource 1 [mem 0xfc300000-0xfc3fffff]
[    0.364180] pci_bus 0000:0f: resource 2 [mem 0xe6900000-0xe69fffff 64bit pref]
[    0.364181] pci_bus 0000:10: resource 1 [mem 0xfbf00000-0xfbffffff]
[    0.364182] pci_bus 0000:10: resource 2 [mem 0xe6500000-0xe65fffff 64bit pref]
[    0.364182] pci_bus 0000:11: resource 1 [mem 0xfbb00000-0xfbbfffff]
[    0.364183] pci_bus 0000:11: resource 2 [mem 0xe6100000-0xe61fffff 64bit pref]
[    0.364184] pci_bus 0000:12: resource 1 [mem 0xfb700000-0xfb7fffff]
[    0.364184] pci_bus 0000:12: resource 2 [mem 0xe5d00000-0xe5dfffff 64bit pref]
[    0.364185] pci_bus 0000:13: resource 0 [io  0x6000-0x6fff]
[    0.364185] pci_bus 0000:13: resource 1 [mem 0xfd200000-0xfd2fffff]
[    0.364186] pci_bus 0000:13: resource 2 [mem 0xe7800000-0xe78fffff 64bit pref]
[    0.364187] pci_bus 0000:14: resource 0 [io  0xa000-0xafff]
[    0.364187] pci_bus 0000:14: resource 1 [mem 0xfce00000-0xfcefffff]
[    0.364188] pci_bus 0000:14: resource 2 [mem 0xe7400000-0xe74fffff 64bit pref]
[    0.364188] pci_bus 0000:15: resource 0 [io  0xe000-0xefff]
[    0.364189] pci_bus 0000:15: resource 1 [mem 0xfca00000-0xfcafffff]
[    0.364189] pci_bus 0000:15: resource 2 [mem 0xe7000000-0xe70fffff 64bit pref]
[    0.364190] pci_bus 0000:16: resource 1 [mem 0xfc600000-0xfc6fffff]
[    0.364191] pci_bus 0000:16: resource 2 [mem 0xe6c00000-0xe6cfffff 64bit pref]
[    0.364191] pci_bus 0000:17: resource 1 [mem 0xfc200000-0xfc2fffff]
[    0.364192] pci_bus 0000:17: resource 2 [mem 0xe6800000-0xe68fffff 64bit pref]
[    0.364192] pci_bus 0000:18: resource 1 [mem 0xfbe00000-0xfbefffff]
[    0.364193] pci_bus 0000:18: resource 2 [mem 0xe6400000-0xe64fffff 64bit pref]
[    0.364193] pci_bus 0000:19: resource 1 [mem 0xfba00000-0xfbafffff]
[    0.364194] pci_bus 0000:19: resource 2 [mem 0xe6000000-0xe60fffff 64bit pref]
[    0.364195] pci_bus 0000:1a: resource 1 [mem 0xfb600000-0xfb6fffff]
[    0.364195] pci_bus 0000:1a: resource 2 [mem 0xe5c00000-0xe5cfffff 64bit pref]
[    0.364196] pci_bus 0000:1b: resource 0 [io  0x7000-0x7fff]
[    0.364206] pci_bus 0000:1b: resource 1 [mem 0xfd100000-0xfd1fffff]
[    0.364207] pci_bus 0000:1b: resource 2 [mem 0xe7700000-0xe77fffff 64bit pref]
[    0.364208] pci_bus 0000:1c: resource 0 [io  0xb000-0xbfff]
[    0.364208] pci_bus 0000:1c: resource 1 [mem 0xfcd00000-0xfcdfffff]
[    0.364209] pci_bus 0000:1c: resource 2 [mem 0xe7300000-0xe73fffff 64bit pref]
[    0.364210] pci_bus 0000:1d: resource 1 [mem 0xfc900000-0xfc9fffff]
[    0.364211] pci_bus 0000:1d: resource 2 [mem 0xe6f00000-0xe6ffffff 64bit pref]
[    0.364212] pci_bus 0000:1e: resource 1 [mem 0xfc500000-0xfc5fffff]
[    0.364213] pci_bus 0000:1e: resource 2 [mem 0xe6b00000-0xe6bfffff 64bit pref]
[    0.364213] pci_bus 0000:1f: resource 1 [mem 0xfc100000-0xfc1fffff]
[    0.364214] pci_bus 0000:1f: resource 2 [mem 0xe6700000-0xe67fffff 64bit pref]
[    0.364215] pci_bus 0000:20: resource 1 [mem 0xfbd00000-0xfbdfffff]
[    0.364218] pci_bus 0000:20: resource 2 [mem 0xe6300000-0xe63fffff 64bit pref]
[    0.364219] pci_bus 0000:21: resource 1 [mem 0xfb900000-0xfb9fffff]
[    0.364220] pci_bus 0000:21: resource 2 [mem 0xe5f00000-0xe5ffffff 64bit pref]
[    0.364222] pci_bus 0000:22: resource 1 [mem 0xfb500000-0xfb5fffff]
[    0.364223] pci_bus 0000:22: resource 2 [mem 0xe5b00000-0xe5bfffff 64bit pref]
[    0.364455] NET: Registered protocol family 2
[    0.364705] tcp_listen_portaddr_hash hash table entries: 1024 (order: 2, 16384 bytes)
[    0.364711] TCP established hash table entries: 16384 (order: 5, 131072 bytes)
[    0.364732] TCP bind hash table entries: 16384 (order: 6, 262144 bytes)
[    0.364750] TCP: Hash tables configured (established 16384 bind 16384)
[    0.364795] UDP hash table entries: 1024 (order: 3, 32768 bytes)
[    0.364795] UDP-Lite hash table entries: 1024 (order: 3, 32768 bytes)
[    0.365245] NET: Registered protocol family 1
[    0.365248] NET: Registered protocol family 44
[    0.365251] pci 0000:00:00.0: Limiting direct PCI/PCI transfers
[    0.365355] pci 0000:00:0f.0: Video device with shadowed ROM at [mem 0x000c0000-0x000dffff]
[    0.366361] PCI: CLS mismatch (32 != 64), using 64 bytes
[    0.366801] Unpacking initramfs...
[    0.710892] Freeing initrd memory: 23392K
[    0.716967] Initialise system trusted keyrings
[    0.716971] Key type blacklist registered
[    0.716990] workingset: timestamp_bits=36 max_order=19 bucket_order=0
[    0.717868] zbud: loaded
[    0.769249] NET: Registered protocol family 38
[    0.769252] Key type asymmetric registered
[    0.769253] Asymmetric key parser 'x509' registered
[    0.769265] Block layer SCSI generic (bsg) driver version 0.4 loaded (major 245)
[    0.769399] io scheduler noop registered
[    0.769400] io scheduler deadline registered
[    0.769447] io scheduler cfq registered (default)
[    0.769447] io scheduler mq-deadline registered
[    0.769448] io scheduler kyber registered
[    0.769468] io scheduler bfq registered
[    0.769549] atomic64_test: passed for x86-64 platform with CX8 and with SSE
[    0.770129] pcieport 0000:00:15.0: Signaling PME with IRQ 24
[    0.770211] pciehp 0000:00:15.0:pcie004: Slot #160 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.771064] pcieport 0000:00:15.1: Signaling PME with IRQ 25
[    0.771130] pciehp 0000:00:15.1:pcie004: Slot #161 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.772011] pcieport 0000:00:15.2: Signaling PME with IRQ 26
[    0.772072] pciehp 0000:00:15.2:pcie004: Slot #162 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.772907] pcieport 0000:00:15.3: Signaling PME with IRQ 27
[    0.772966] pciehp 0000:00:15.3:pcie004: Slot #163 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.773864] pcieport 0000:00:15.4: Signaling PME with IRQ 28
[    0.773923] pciehp 0000:00:15.4:pcie004: Slot #164 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.774796] pcieport 0000:00:15.5: Signaling PME with IRQ 29
[    0.774873] pciehp 0000:00:15.5:pcie004: Slot #165 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.775748] pcieport 0000:00:15.6: Signaling PME with IRQ 30
[    0.775814] pciehp 0000:00:15.6:pcie004: Slot #166 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.776687] pcieport 0000:00:15.7: Signaling PME with IRQ 31
[    0.776747] pciehp 0000:00:15.7:pcie004: Slot #167 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.777603] pcieport 0000:00:16.0: Signaling PME with IRQ 32
[    0.777664] pciehp 0000:00:16.0:pcie004: Slot #192 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.778526] pcieport 0000:00:16.1: Signaling PME with IRQ 33
[    0.778586] pciehp 0000:00:16.1:pcie004: Slot #193 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.779459] pcieport 0000:00:16.2: Signaling PME with IRQ 34
[    0.779520] pciehp 0000:00:16.2:pcie004: Slot #194 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.780370] pcieport 0000:00:16.3: Signaling PME with IRQ 35
[    0.780429] pciehp 0000:00:16.3:pcie004: Slot #195 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.781263] pcieport 0000:00:16.4: Signaling PME with IRQ 36
[    0.781326] pciehp 0000:00:16.4:pcie004: Slot #196 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.782191] pcieport 0000:00:16.5: Signaling PME with IRQ 37
[    0.782254] pciehp 0000:00:16.5:pcie004: Slot #197 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.783838] pcieport 0000:00:16.6: Signaling PME with IRQ 38
[    0.783938] pciehp 0000:00:16.6:pcie004: Slot #198 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.785501] pcieport 0000:00:16.7: Signaling PME with IRQ 39
[    0.785566] pciehp 0000:00:16.7:pcie004: Slot #199 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.786805] pcieport 0000:00:17.0: Signaling PME with IRQ 40
[    0.786885] pciehp 0000:00:17.0:pcie004: Slot #224 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.787847] pcieport 0000:00:17.1: Signaling PME with IRQ 41
[    0.787909] pciehp 0000:00:17.1:pcie004: Slot #225 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.788800] pcieport 0000:00:17.2: Signaling PME with IRQ 42
[    0.788861] pciehp 0000:00:17.2:pcie004: Slot #226 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.789776] pcieport 0000:00:17.3: Signaling PME with IRQ 43
[    0.789843] pciehp 0000:00:17.3:pcie004: Slot #227 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.790705] pcieport 0000:00:17.4: Signaling PME with IRQ 44
[    0.790764] pciehp 0000:00:17.4:pcie004: Slot #228 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.791703] pcieport 0000:00:17.5: Signaling PME with IRQ 45
[    0.791762] pciehp 0000:00:17.5:pcie004: Slot #229 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.792647] pcieport 0000:00:17.6: Signaling PME with IRQ 46
[    0.792707] pciehp 0000:00:17.6:pcie004: Slot #230 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.793592] pcieport 0000:00:17.7: Signaling PME with IRQ 47
[    0.793652] pciehp 0000:00:17.7:pcie004: Slot #231 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.794463] pcieport 0000:00:18.0: Signaling PME with IRQ 48
[    0.794522] pciehp 0000:00:18.0:pcie004: Slot #256 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.795415] pcieport 0000:00:18.1: Signaling PME with IRQ 49
[    0.795474] pciehp 0000:00:18.1:pcie004: Slot #257 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.796291] pcieport 0000:00:18.2: Signaling PME with IRQ 50
[    0.796351] pciehp 0000:00:18.2:pcie004: Slot #258 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.797341] pcieport 0000:00:18.3: Signaling PME with IRQ 51
[    0.797460] pciehp 0000:00:18.3:pcie004: Slot #259 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.798893] pcieport 0000:00:18.4: Signaling PME with IRQ 52
[    0.798990] pciehp 0000:00:18.4:pcie004: Slot #260 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.800354] pcieport 0000:00:18.5: Signaling PME with IRQ 53
[    0.800417] pciehp 0000:00:18.5:pcie004: Slot #261 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.801463] pcieport 0000:00:18.6: Signaling PME with IRQ 54
[    0.801526] pciehp 0000:00:18.6:pcie004: Slot #262 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.802441] pcieport 0000:00:18.7: Signaling PME with IRQ 55
[    0.802503] pciehp 0000:00:18.7:pcie004: Slot #263 AttnBtn+ PwrCtrl+ MRL- AttnInd- PwrInd- HotPlug+ Surprise- Interlock- NoCompl+ LLActRep+
[    0.802963] shpchp: Standard Hot Plug PCI Controller Driver version: 0.4
[    0.802984] intel_idle: Please enable MWAIT in BIOS SETUP
[    0.803289] ACPI: AC Adapter [ACAD] (on-line)
[    0.803362] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0
[    0.803409] ACPI: Power Button [PWRF]
[    0.803988] Serial: 8250/16550 driver, 4 ports, IRQ sharing enabled
[    0.827222] 00:05: ttyS0 at I/O 0x3f8 (irq = 4, base_baud = 115200) is a 16550A
[    0.851138] 00:06: ttyS1 at I/O 0x2f8 (irq = 3, base_baud = 115200) is a 16550A
[    0.851979] Non-volatile memory driver v1.3
[    0.852271] rdac: device handler registered
[    0.852374] hp_sw: device handler registered
[    0.852374] emc: device handler registered
[    0.852491] alua: device handler registered
[    0.852517] libphy: Fixed MDIO Bus: probed
[    0.852614] ehci_hcd: USB 2.0 'Enhanced' Host Controller (EHCI) Driver
[    0.852616] ehci-pci: EHCI PCI platform driver
[    0.852980] ehci-pci 0000:02:03.0: EHCI Host Controller
[    0.853069] ehci-pci 0000:02:03.0: new USB bus registered, assigned bus number 1
[    0.853217] ehci-pci 0000:02:03.0: cache line size of 64 is not supported
[    0.853234] ehci-pci 0000:02:03.0: irq 17, io mem 0xfd5ef000
[    0.860585] ehci-pci 0000:02:03.0: USB 2.0 started, EHCI 1.00
[    0.860659] usb usb1: New USB device found, idVendor=1d6b, idProduct=0002, bcdDevice= 4.19
[    0.860660] usb usb1: New USB device strings: Mfr=3, Product=2, SerialNumber=1
[    0.860661] usb usb1: Product: EHCI Host Controller
[    0.860662] usb usb1: Manufacturer: Linux 4.19.90-2003.4.0.0036.oe1.x86_64 ehci_hcd
[    0.860662] usb usb1: SerialNumber: 0000:02:03.0
[    0.861103] hub 1-0:1.0: USB hub found
[    0.861106] hub 1-0:1.0: 6 ports detected
[    0.861322] ohci_hcd: USB 1.1 'Open' Host Controller (OHCI) Driver
[    0.861325] ohci-pci: OHCI PCI platform driver
[    0.861353] uhci_hcd: USB Universal Host Controller Interface driver
[    0.861630] uhci_hcd 0000:02:00.0: UHCI Host Controller
[    0.862040] uhci_hcd 0000:02:00.0: new USB bus registered, assigned bus number 2
[    0.862098] uhci_hcd 0000:02:00.0: detected 2 ports
[    0.862275] uhci_hcd 0000:02:00.0: irq 18, io base 0x00002080
[    0.862415] usb usb2: New USB device found, idVendor=1d6b, idProduct=0001, bcdDevice= 4.19
[    0.862416] usb usb2: New USB device strings: Mfr=3, Product=2, SerialNumber=1
[    0.862417] usb usb2: Product: UHCI Host Controller
[    0.862417] usb usb2: Manufacturer: Linux 4.19.90-2003.4.0.0036.oe1.x86_64 uhci_hcd
[    0.862418] usb usb2: SerialNumber: 0000:02:00.0
[    0.862678] hub 2-0:1.0: USB hub found
[    0.862681] hub 2-0:1.0: 2 ports detected
[    0.862908] usbcore: registered new interface driver usbserial_generic
[    0.862912] usbserial: USB Serial support registered for generic
[    0.862948] i8042: PNP: PS/2 Controller [PNP0303:KBC,PNP0f13:MOUS] at 0x60,0x64 irq 1,12
[    0.863611] serio: i8042 KBD port at 0x60,0x64 irq 1
[    0.863636] serio: i8042 AUX port at 0x60,0x64 irq 12
[    0.863724] mousedev: PS/2 mouse device common for all mice
[    0.864308] rtc_cmos 00:01: registered as rtc0
[    0.864317] rtc_cmos 00:01: alarms up to one month, y3k, 114 bytes nvram, hpet irqs
[    0.865823] hidraw: raw HID events driver (C) Jiri Kosina
[    0.865879] usbcore: registered new interface driver usbhid
[    0.865879] usbhid: USB HID core driver
[    0.866170] drop_monitor: Initializing network drop monitor service
[    0.866295] Initializing XFRM netlink socket
[    0.866393] NET: Registered protocol family 10
[    0.866907] Segment Routing with IPv6
[    0.866924] NET: Registered protocol family 17
[    0.867083] mpls_gso: MPLS GSO support
[    0.867266] core: Using 8 MCE banks
[    0.867275] AVX2 version of gcm_enc/dec engaged.
[    0.867276] AES CTR mode by8 optimization enabled
[    0.867698] input: AT Translated Set 2 keyboard as /devices/platform/i8042/serio0/input/input1
[    0.868250] input: VirtualPS/2 VMware VMMouse as /devices/platform/i8042/serio1/input/input4
[    0.868577] input: VirtualPS/2 VMware VMMouse as /devices/platform/i8042/serio1/input/input3
[    0.880465] sched_clock: Marking stable (876646559, 3760546)->(905577313, -25170208)
[    0.880730] registered taskstats version 1
[    0.880736] Loading compiled-in X.509 certificates
[    0.908305] Loaded X.509 cert 'EulerOS kernel signing key: 70defeb14ceb0eb090b5a94e35939decd13058bd'
[    0.908333] zswap: loaded using pool lzo/zbud
[    0.914574] Key type big_key registered
[    0.916376] Key type trusted registered
[    0.918186] Key type encrypted registered
[    0.918192] ima: No TPM chip found, activating TPM-bypass!
[    0.918197] ima: Allocated hash algorithm: sha1
[    0.918210] evm: Initialising EVM extended attributes:
[    0.918211] evm: security.selinux
[    0.918211] evm: security.ima
[    0.918211] evm: security.capability
[    0.918212] evm: HMAC attrs: 0x1
[    0.919353] rtc_cmos 00:01: setting system clock to 2021-07-21 07:34:20 UTC (1626852860)
[    0.919381] NMI watchdog: Perf NMI watchdog permanently disabled
[    0.921513] Freeing unused decrypted memory: 2040K
[    0.921878] Freeing unused kernel image memory: 2360K
[    0.925905] Write protecting the kernel read-only data: 18432k
[    0.927235] Freeing unused kernel image memory: 2012K
[    0.927356] Freeing unused kernel image memory: 404K
[    0.927402] Run /init as init process
[    0.940918] systemd[1]: systemd v243-18.oe1 running in system mode. (+PAM +AUDIT +SELINUX +IMA -APPARMOR +SMACK +SYSVINIT +UTMP +LIBCRYPTSETUP +GCRYPT +GNUTLS +ACL +XZ +LZ4 +SECCOMP +BLKID +ELFUTILS +KMOD +IDN2 -IDN +PCRE2 default-hierarchy=legacy)
[    0.940946] systemd[1]: Detected virtualization vmware.
[    0.940949] systemd[1]: Detected architecture x86-64.
[    0.940950] systemd[1]: Running in initial RAM disk.
[    0.947818] systemd[1]: Set hostname to <localhost.localdomain>.
[    1.004321] systemd[1]: system-systemd\x2dhibernate\x2dresume.slice: unit configures an IP firewall, but the local system does not support BPF/cgroup firewalling.
[    1.004323] systemd[1]: (This warning is only shown for the first unit using IP firewalling.)
[    1.004808] systemd[1]: Created slice system-systemd\x2dhibernate\x2dresume.slice.
[    1.004855] systemd[1]: Reached target Slices.
[    1.004863] systemd[1]: Reached target Swap.
[    1.187074] usb 2-1: new full-speed USB device number 2 using uhci_hcd
[    1.234699] device-mapper: uevent: version 1.0.3
[    1.234794] device-mapper: ioctl: 4.39.0-ioctl (2018-04-03) initialised: dm-devel@redhat.com
[    1.259895] audit: type=1130 audit(1626852860.834:2): pid=1 uid=0 auid=4294967295 ses=4294967295 subj=kernel msg='unit=dracut-pre-udev comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
[    1.285956] usb 2-1: New USB device found, idVendor=0e0f, idProduct=0003, bcdDevice= 1.03
[    1.285958] usb 2-1: New USB device strings: Mfr=1, Product=2, SerialNumber=0
[    1.285959] usb 2-1: Product: VMware Virtual USB Mouse
[    1.285959] usb 2-1: Manufacturer: VMware
[    1.299991] input: VMware VMware Virtual USB Mouse as /devices/pci0000:00/0000:00:11.0/0000:02:00.0/usb2/2-1/2-1:1.0/0003:0E0F:0003.0001/input/input5
[    1.300263] hid-generic 0003:0E0F:0003.0001: input,hidraw0: USB HID v1.10 Mouse [VMware VMware Virtual USB Mouse] on usb-0000:02:00.0-1/input0
[    1.334822] audit: type=1130 audit(1626852860.913:3): pid=1 uid=0 auid=4294967295 ses=4294967295 subj=kernel msg='unit=systemd-journald comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
[    1.414544] usb 2-2: new full-speed USB device number 3 using uhci_hcd
[    1.475123] audit: type=1130 audit(1626852861.054:4): pid=1 uid=0 auid=4294967295 ses=4294967295 subj=kernel msg='unit=systemd-udevd comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
[    1.568544] usb 2-2: New USB device found, idVendor=0e0f, idProduct=0002, bcdDevice= 1.00
[    1.568546] usb 2-2: New USB device strings: Mfr=1, Product=2, SerialNumber=0
[    1.568547] usb 2-2: Product: VMware Virtual USB Hub
[    1.568548] usb 2-2: Manufacturer: VMware, Inc.
[    1.576311] hub 2-2:1.0: USB hub found
[    1.580225] hub 2-2:1.0: 7 ports detected
[    1.594810] audit: type=1130 audit(1626852861.173:5): pid=1 uid=0 auid=4294967295 ses=4294967295 subj=kernel msg='unit=systemd-udev-trigger comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
[    1.619777] audit: type=1130 audit(1626852861.198:6): pid=1 uid=0 auid=4294967295 ses=4294967295 subj=kernel msg='unit=plymouth-start comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
[    1.702308] Fusion MPT base driver 3.04.20
[    1.702309] Copyright (c) 1999-2008 LSI Corporation
[    1.742337] Fusion MPT SPI Host driver 3.04.20
[    1.743179] e1000: Intel(R) PRO/1000 Network Driver - version 7.3.21-k8-NAPI
[    1.743180] e1000: Copyright (c) 1999-2006 Intel Corporation.
[    1.763356] mptbase: ioc0: Initiating bringup
[    1.771885] tsc: Refined TSC clocksource calibration: 3408.001 MHz
[    1.771925] clocksource: tsc: mask: 0xffffffffffffffff max_cycles: 0x311fd4641c7, max_idle_ns: 440795203939 ns
[    1.771957] clocksource: Switched to clocksource tsc
[    1.780600] libata version 3.00 loaded.
[    1.784217] ata_piix 0000:00:07.1: version 2.13
[    1.791243] ioc0: LSI53C1030 B0: Capabilities={Initiator}
[    1.795703] scsi host0: ata_piix
[    1.803769] scsi host1: ata_piix
[    1.803856] ata1: PATA max UDMA/33 cmd 0x1f0 ctl 0x3f6 bmdma 0x1060 irq 14
[    1.803857] ata2: PATA max UDMA/33 cmd 0x170 ctl 0x376 bmdma 0x1068 irq 15
[    1.821682] [drm] DMA map mode: Using physical TTM page addresses.
[    1.821891] [drm] Capabilities:
[    1.821891] [drm]   Rect copy.
[    1.821892] [drm]   Cursor.
[    1.821892] [drm]   Cursor bypass.
[    1.821892] [drm]   Cursor bypass 2.
[    1.821892] [drm]   8bit emulation.
[    1.821892] [drm]   Alpha cursor.
[    1.821893] [drm]   Extended Fifo.
[    1.821893] [drm]   Multimon.
[    1.821893] [drm]   Pitchlock.
[    1.821893] [drm]   Irq mask.
[    1.821893] [drm]   Display Topology.
[    1.821894] [drm]   GMR.
[    1.821894] [drm]   Traces.
[    1.821894] [drm]   GMR2.
[    1.821894] [drm]   Screen Object 2.
[    1.821894] [drm]   Command Buffers.
[    1.821895] [drm]   Command Buffers 2.
[    1.821895] [drm]   Guest Backed Resources.
[    1.821895] [drm]   DX Features.
[    1.821895] [drm]   HP Command Queue.
[    1.821896] [drm] Capabilities2:
[    1.821896] [drm]   Grow oTable.
[    1.821896] [drm]   IntraSurface copy.
[    1.821897] [drm] Max GMR ids is 64
[    1.821897] [drm] Max number of GMR pages is 65536
[    1.821897] [drm] Max dedicated hypervisor surface memory is 0 kiB
[    1.821898] [drm] Maximum display memory size is 262144 kiB
[    1.821898] [drm] VRAM at 0xe8000000 size is 4096 kiB
[    1.821899] [drm] MMIO at 0xfe000000 size is 256 kiB
[    1.822222] [drm] global init.
[    1.822907] [TTM] Zone  kernel: Available graphics memory: 1006992 kiB
[    1.822908] [TTM] Initializing pool allocator
[    1.822910] [TTM] Initializing DMA pool allocator
[    1.823491] [drm] Supports vblank timestamp caching Rev 2 (21.10.2013).
[    1.823492] [drm] No driver support for vblank timestamp query.
[    1.824147] [drm] Screen Target Display device initialized
[    1.824194] [drm] width 800
[    1.824199] [drm] height 480
[    1.824203] [drm] bpp 32
[    1.825140] [drm] Fifo max 0x00040000 min 0x00001000 cap 0x0000077f
[    1.826047] [drm] Using command buffers with DMA pool.
[    1.826050] [drm] DX: no.
[    1.826050] [drm] Atomic: yes.
[    1.826051] [drm] SM4_1: no.
[    1.832872] fbcon: svgadrmfb (fb0) is primary device
[    1.834519] Console: switching to colour frame buffer device 100x37
[    1.838954] [drm] Initialized vmwgfx 2.15.0 20180704 for 0000:00:0f.0 on minor 0
[    1.883338] scsi host2: ioc0: LSI53C1030 B0, FwRev=01032920h, Ports=1, MaxQ=128, IRQ=17
[    1.964219] scsi 2:0:0:0: Direct-Access     VMware,  VMware Virtual S 1.0  PQ: 0 ANSI: 2
[    1.974490] ata2.00: ATAPI: VMware Virtual IDE CDROM Drive, 00000001, max UDMA/33
[    1.984149] scsi: waiting for bus probes to complete ...
[    1.984156] scsi target2:0:0: Beginning Domain Validation
[    1.984741] scsi target2:0:0: Domain Validation skipping write tests
[    1.984742] scsi target2:0:0: Ending Domain Validation
[    1.984767] scsi target2:0:0: FAST-40 WIDE SCSI 80.0 MB/s ST (25 ns, offset 127)
[    1.996472] scsi 1:0:0:0: CD-ROM            NECVMWar VMware IDE CDR10 1.00 PQ: 0 ANSI: 5
[    2.021251] sr 1:0:0:0: [sr0] scsi3-mmc drive: 1x/1x writer dvd-ram cd/rw xa/form2 cdda tray
[    2.021253] cdrom: Uniform CD-ROM driver Revision: 3.20
[    2.021283] sd 2:0:0:0: [sda] 41943040 512-byte logical blocks: (21.5 GB/20.0 GiB)
[    2.021359] sd 2:0:0:0: [sda] Write Protect is off
[    2.021361] sd 2:0:0:0: [sda] Mode Sense: 61 00 00 00
[    2.021448] sd 2:0:0:0: [sda] Cache data unavailable
[    2.021449] sd 2:0:0:0: [sda] Assuming drive cache: write through
[    2.025880] sr 1:0:0:0: Attached scsi CD-ROM sr0
[    2.028105]  sda: sda1 sda2
[    2.029992] sd 2:0:0:0: [sda] Attached SCSI disk
[    2.087704] random: fast init done
[    2.220246] e1000 0000:02:01.0 eth0: (PCI:66MHz:32-bit) 00:0c:29:38:79:ed
[    2.220252] e1000 0000:02:01.0 eth0: Intel(R) PRO/1000 Network Connection
[    2.224860] e1000 0000:02:01.0 ens33: renamed from eth0
[    2.293709] random: lvm: uninitialized urandom read (4 bytes read)
[    2.312920] random: lvm: uninitialized urandom read (4 bytes read)
[    2.320379] random: lvm: uninitialized urandom read (2 bytes read)
[    2.390907] PM: Image not found (code -22)
[    2.391866] audit: type=1130 audit(1626852861.970:7): pid=1 uid=0 auid=4294967295 ses=4294967295 subj=kernel msg='unit=systemd-hibernate-resume@dev-mapper-openeuler\x2dswap comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
[    2.391868] audit: type=1131 audit(1626852861.971:8): pid=1 uid=0 auid=4294967295 ses=4294967295 subj=kernel msg='unit=systemd-hibernate-resume@dev-mapper-openeuler\x2dswap comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
[    2.406672] audit: type=1130 audit(1626852861.986:9): pid=1 uid=0 auid=4294967295 ses=4294967295 subj=kernel msg='unit=systemd-tmpfiles-setup comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
[    2.425383] audit: type=1130 audit(1626852861.999:10): pid=1 uid=0 auid=4294967295 ses=4294967295 subj=kernel msg='unit=dracut-initqueue comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
[    2.489653] EXT4-fs (dm-0): mounted filesystem with ordered data mode. Opts: (null)
[    2.942319] systemd-journald[224]: Received SIGTERM from PID 1 (systemd).
[    3.019843] systemd: 25 output lines suppressed due to ratelimiting
[    3.185277] random: crng init done
[    3.185279] random: 2 urandom warning(s) missed due to ratelimiting
[    4.164733] SELinux:  Class xdp_socket not defined in policy.
[    4.164734] SELinux: the above unknown classes and permissions will be allowed
[    4.164738] SELinux:  policy capability network_peer_controls=1
[    4.164739] SELinux:  policy capability open_perms=1
[    4.164739] SELinux:  policy capability extended_socket_class=1
[    4.164739] SELinux:  policy capability always_check_network=0
[    4.164740] SELinux:  policy capability cgroup_seclabel=1
[    4.164740] SELinux:  policy capability nnp_nosuid_transition=1
[    4.183583] systemd[1]: Successfully loaded SELinux policy in 516.768ms.
[    4.436702] systemd[1]: Relabelled /dev, /dev/shm, /run, /sys/fs/cgroup in 21.352ms.
[    4.449578] systemd[1]: systemd v243-18.oe1 running in system mode. (+PAM +AUDIT +SELINUX +IMA -APPARMOR +SMACK +SYSVINIT +UTMP +LIBCRYPTSETUP +GCRYPT +GNUTLS +ACL +XZ +LZ4 +SECCOMP +BLKID +ELFUTILS +KMOD +IDN2 -IDN +PCRE2 default-hierarchy=legacy)
[    4.449608] systemd[1]: Detected virtualization vmware.
[    4.449611] systemd[1]: Detected architecture x86-64.
[    4.456671] systemd[1]: Set hostname to <localhost.localdomain>.
[    4.634794] systemd-rc-local-generator[597]: /etc/rc.d/rc.local is not marked executable, skipping.
[    5.070655] systemd[1]: /usr/lib/systemd/system/auditd.service:13: PIDFile= references a path below legacy directory /var/run/, updating /var/run/auditd.pid â†’ /run/auditd.pid; please update the unit file accordingly.
[    5.181440] systemd[1]: /usr/lib/systemd/system/gssproxy.service:10: PIDFile= references a path below legacy directory /var/run/, updating /var/run/gssproxy.pid â†’ /run/gssproxy.pid; please update the unit file accordingly.
[    5.242244] systemd[1]: /usr/lib/systemd/system/dbus.socket:5: ListenStream= references a path below legacy directory /var/run/, updating /var/run/dbus/system_bus_socket â†’ /run/dbus/system_bus_socket; please update the unit file accordingly.
[    5.321988] systemd[1]: /usr/lib/systemd/system/restorecond.service:9: PIDFile= references a path below legacy directory /var/run/, updating /var/run/restorecond.pid â†’ /run/restorecond.pid; please update the unit file accordingly.
[    5.345640] systemd[1]: /usr/lib/systemd/system/iscsid.service:8: PIDFile= references a path below legacy directory /var/run/, updating /var/run/iscsid.pid â†’ /run/iscsid.pid; please update the unit file accordingly.
[    5.350861] systemd[1]: /usr/lib/systemd/system/virtlockd.socket:6: ListenStream= references a path below legacy directory /var/run/, updating /var/run/libvirt/virtlockd-sock â†’ /run/libvirt/virtlockd-sock; please update the unit file accordingly.
[    5.562006] kauditd_printk_skb: 24 callbacks suppressed
[    5.562007] audit: type=1131 audit(1626852865.141:35): pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=systemd-journald comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
[    5.569852] audit: type=1130 audit(1626852865.142:36): pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=initrd-switch-root comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
[    5.569855] audit: type=1131 audit(1626852865.142:37): pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=initrd-switch-root comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
[    5.595983] audit: type=1130 audit(1626852865.174:38): pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=systemd-journald comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
[    5.596015] audit: type=1131 audit(1626852865.174:39): pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=systemd-journald comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
[    5.618939] audit: type=1130 audit(1626852865.197:40): pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=kmod-static-nodes comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
[    5.648111] EXT4-fs (dm-0): re-mounted. Opts: (null)
[    5.655608] audit: type=1130 audit(1626852865.235:41): pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=systemd-remount-fs comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
[    5.688004] audit: type=1130 audit(1626852865.265:42): pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=systemd-random-seed comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
[    5.714882] VFS: Open an write opened block device exclusively dm-1 [605 swapon].
[    5.720143] Adding 2097148k swap on /dev/mapper/openeuler-swap.  Priority:-2 extents:1 across:2097148k FS
[    5.736306] audit: type=1130 audit(1626852865.315:43): pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=systemd-sysctl comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
[    5.849843] audit: type=1130 audit(1626852865.428:44): pid=1 uid=0 auid=4294967295 ses=4294967295 subj=system_u:system_r:init_t:s0 msg='unit=lvm2-lvmetad comm="systemd" exe="/usr/lib/systemd/systemd" hostname=? addr=? terminal=? res=success'
[    6.078933] systemd-journald[612]: Received client request to flush runtime journal.
[    8.473786] piix4_smbus 0000:00:07.3: SMBus Host Controller not enabled!
[    8.500339] vmw_vmci 0000:00:07.7: Found VMCI PCI device at 0x11080, irq 16
[    8.500414] vmw_vmci 0000:00:07.7: Using capabilities 0x8000000c
[    8.506490] Guest personality initialized and is active
[    8.506962] VMCI host device registered (name=vmci, major=10, minor=58)
[    8.506963] Initialized host personality
[    8.525622] sd 2:0:0:0: Attached scsi generic sg0 type 0
[    8.525695] sr 1:0:0:0: Attached scsi generic sg1 type 5
[    9.119687] input: PC Speaker as /devices/platform/pcspkr/input/input6
[    9.456483] EXT4-fs (sda1): mounted filesystem with ordered data mode. Opts: (null)
[    9.909623] RPC: Registered named UNIX socket transport module.
[    9.909624] RPC: Registered udp transport module.
[    9.909624] RPC: Registered tcp transport module.
[    9.909624] RPC: Registered tcp NFSv4.1 backchannel transport module.
[    9.975534] RAPL PMU: API unit is 2^-32 Joules, 5 fixed counters, 10737418240 ms ovfl timer
[    9.975536] RAPL PMU: hw unit of domain pp0-core 2^-0 Joules
[    9.975536] RAPL PMU: hw unit of domain package 2^-0 Joules
[    9.975537] RAPL PMU: hw unit of domain dram 2^-0 Joules
[    9.975537] RAPL PMU: hw unit of domain pp1-gpu 2^-0 Joules
[    9.975538] RAPL PMU: hw unit of domain psys 2^-0 Joules
[   11.315819] SELinux:  Context system_u:object_r:container_config_t:s0 is not valid (left unmapped).
[   15.861689] IPv6: ADDRCONF(NETDEV_UP): ens33: link is not ready
[   15.868978] IPv6: ADDRCONF(NETDEV_UP): ens33: link is not ready
[   15.869763] e1000: ens33 NIC Link is Up 1000 Mbps Full Duplex, Flow Control: None
[   15.870947] IPv6: ADDRCONF(NETDEV_CHANGE): ens33: link becomes ready
[   17.152067] bridge: filtering via arp/ip/ip6tables is no longer available by default. Update your scripts to load br_netfilter if you need this.
[   17.200685] tun: Universal TUN/TAP device driver, 1.6
[   17.203222] virbr0: port 1(virbr0-nic) entered blocking state
[   17.203223] virbr0: port 1(virbr0-nic) entered disabled state
[   17.203295] device virbr0-nic entered promiscuous mode
[   17.573166] virbr0: port 1(virbr0-nic) entered blocking state
[   17.573167] virbr0: port 1(virbr0-nic) entered listening state
[   17.624656] virbr0: port 1(virbr0-nic) entered disabled state
```
