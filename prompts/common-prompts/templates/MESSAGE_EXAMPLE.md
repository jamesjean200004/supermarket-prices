# MESSAGE_EXAMPLE.md

Human 说“这个好”的一条 message，AI 帮 Human 写 message / email 时照它的样子写（`AGENTS.md` 的 `Message / Email 像同事说话`）。Human 以后说另一条更好时，AI 用那条整条替换下面的内容，只保留一条。

- **来源**：v-project 2026-11-13 的 Chat（AZZU-4027），Teams 里回 Vinh：他说 pipeline 有权限加 role，Human 查完后回复他。Human 说“这次写的这个消息清楚多了”，自己加了 `for NZ`。
- **照什么学**：先说查到了什么，一个对象一行，开头写它属于哪个 Subscription，几行句式一样（权限从哪来 → 所以能做什么）；缺口单独一行，写清缺什么、为什么要；最后只问一个开放问题，不替对方给选项；真实名字用代码样式，只加粗要对方回答的词。
- **第 1 版的问题**：只说了一个 Subscription“找到了”就直接问，还替对方给了两个选项；对方要自己拼出第二个 Subscription 为什么重要。

---

Thanks Vinh, this is what I found:
1. WOWPROD: `SPN-WOWPROD-Platform` gets `xCustom-WooliesX-Owner` through the `Azure-WOWPROD-WooliesX-Owner-AAD` group, so it can assign roles in WOWPROD.
2. WWNZPROD: `spn-wwnzprod-azdo-rbac` has User Access Administrator on WWNZPROD, so it can assign roles in WWNZPROD.
3. What's missing for NZ: `spn-wwnzprod-azdo-rbac` has no roles in WOWPROD. It needs to give the WWNZPROD policy identity Backup Contributor on `wlx-prod-apm-aae-rg`, because the policy creates the backup instances inside the vault in that RG.

Just wondering how we can give `spn-wwnzprod-azdo-rbac` this **permission in WOWPROD**?
