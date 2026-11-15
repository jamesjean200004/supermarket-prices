# MULTI_AI_ROLES.md

## Scenario-Based Mandatory

触发条件：Codex 从 GitHub 仓库文件或 GitHub Projects 查找、领取、恢复或分派任务（包括 Codex 独自执行）；多个 AI（Claude、Codex、网页 ChatGPT）协作；Codex 把工作委派给网页 ChatGPT。入口见 `AGENTS.md` 的 `规则索引：什么任务读哪个文件`。

2026-10-30 Human 决定取消 Claude + Codex Task Gate（Do → Report 前要 Claude 和 Codex 双方批准同一份 plan）；本文件只保留多个 AI 怎么分工的规则。APP / Game 方案的 `Claude + Codex Dual Review Gate` 在 canonical `$apple-app-design-standards` Skill 里，不受影响。

### GitHub 任务领取归属

- **检查权威记录**：Codex 从 GitHub 仓库文件（如总索引、信息汇总、To-Do）或 GitHub Projects 找到任务后，先按当前 Repository 的 `AGENTS.md`、`PROJECT_LOCAL_OVERRIDES.md` 找到该任务既有的权威共享记录，读取最新负责人、领取状态和进行中工作；只有 Codex 自己执行时也必须检查。
- **发现已有负责人**：已有负责人领取的任务不得重复领取；恢复原任务时，核实当前执行与既有领取属于同一任务和执行实例、状态允许继续后可以继续，不能仅凭同为 `Codex` 或 `Claude` 就认定是同一个实例；需要转交时先确认原分配已解除或转交获授权，并将变更写回权威记录。
- **领取与验证**：确定未领取后，Codex 先按该项目原有字段或内容格式把 `Codex`（自己执行）或 `Claude`（委派）标为当前负责人，并写入适用的领取 / 进行中状态；重新读取共享记录，确认写入成功、负责人仍唯一且没有并发冲突，才允许实际开始或分派。不得仅靠 Chat 声明、未验证的 API 返回或本地未同步文件声称领取成功。
- **状态变化**：任务领取、委派、转交、暂停、完成或取消时，及时更新同一个权威共享记录的负责人和状态；沿用原项目 schema、枚举、权限及交付流程，不另建 GitHub 账号、不擅自添加 Projects 字段或另维护第二套任务事实。
- **Fail closed**：无法确认最新记录、无写权限、无法可靠持久标记、发生竞态冲突或记录互相矛盾时，Codex 必须暂停该任务、说明 blocker 和实际可验证状态；不得假装领取成功、覆盖别人领取或重复开工。

### 多个 AI 怎么分工

- **AI 同意不等于 Human 批准**：AI 间 review 不代替仍适用的 Human gate；Personal Project 的 PRD、技术方案和日常开发本身不再新增 Human approval，只有需要 Human 批准的 UI mockup、付费、永久删除、账号/安全权限、公司环境及其他明确保护的动作才按对应 gate 停下。
- **Role priority**：先遵守当前 Human 授权、项目 Local Overrides、任务负责人和并发保护；Personal Project 有可用执行能力时，Mac Codex App、Claude Code 或 Web Chat 都可承担独立 bounded task 的主 Worker。Codex 不应因为历史上的“只监督”默认分工而停止自己已获授权且具备工具的实现、Xcode/Unity 测试、修复与交付；只有实际适用的独立 review 要求才分离作者和 reviewer。
- **Execution owner**：按当前任务的真实工具/环境选择最能执行的 Worker；已有 owner 保持独占，必要时按共享记录安全转交。只有 Human 当前明确指定 Web Chat 或 Codex 监督-only 时才遵循该分工；不把 Web Chat 作为所有个人项目的默认强制执行入口。
- **能力缺口**：某一 AI 缺少本地文件、Xcode、Unity、Browser 或 Git 权限时，先检查已授权的其他执行 Worker 是否能直接完成；可行则安全转交并继续，不为普通执行方式重新要 Human 批准。若所有可用工具都无法执行，或涉及真正的 Human gate、并发冲突、费用风险，先保存 checkpoint 并报告具体 blocker；不能声称测试或发布已经 PASS，也不能承诺在本次会话结束后继续后台运行。
- **授权不扩张**：Web Chat 委派只覆盖当前请求；只传最小必要资料，不传 secrets，并保留 mockup、review、Human approval 和 release gates；Codex 必须以实际产物和 test evidence 验收，不能只凭网页自称完成。
