# GITHUB_ZERO_SPEND_GATE.md

## Scenario-Based Mandatory

### GitHub Zero-Spend Gate

所有 GitHub 工作必须保持 `$0` paid spend，并优先使用 included free usage。

- **禁止付费动作**：AI 不得添加或保存 payment method、启用 paid usage、把 paid budget 提高到 `$0` 以上、购买 minutes、选择 paid / larger runner，或创建其他可能收费的 GitHub resource；Human 当前明确要求付费也必须先说明 exact cost mechanism 和 scope，再按 payment gate 单独确认。
- **执行前核查**：每次 potentially billable GitHub execution 前，以及收到 billing warning 后，使用已授权的 read-only evidence 核查 payment method、paid-usage、budget、runner 和 included quota；不能确认 zero-spend 时 fail closed，并报告 blocker。
- **额度耗尽**：free GitHub Actions minutes 用完时，执行 equivalent local validation，并把 cloud validation 记为 blocked；required check 不能因成本被 bypass，只能等待 free reset，或使用 current rules 接受的 equivalent free execution path。
- **有限 waiver**：Human 的 one-task waiver 只适用于 non-required cloud check，并且必须有 equivalent local evidence；不能用于 security、required-check 或 release gate，也不继承到其他 task。
- **Merge truth**：没有运行的 cloud job 不能写成 passed；若 current rules 允许在 non-required check blocked 时 merge，必须记录 local evidence、Human waiver 和未运行原因。
