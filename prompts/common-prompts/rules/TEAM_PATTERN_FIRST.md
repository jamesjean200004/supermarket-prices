# TEAM_PATTERN_FIRST.md

## Scenario-Based Mandatory

### Team Pattern First

修改 Team / shared / company code 或 Team-facing document 时：

1. 先读 Team 已有相同/相近 module、caller、pipeline、folder、naming、tests、document pattern。
2. Existing pattern 能满足需求时必须 follow，不另造 parallel pattern。
3. 只有现有 pattern 明确不能满足 correctness/security/requirement 时才提出最小差异，并说明原因。
4. Personal Sandbox 模拟 Team code 时，只替换 environment/resource identity/data；implementation pattern 默认保持一致。

### Team / work repo 流程

- **Team/work repo**：Team branch/PR/review/approval/release/production change process 优先于 Personal Project workflow
