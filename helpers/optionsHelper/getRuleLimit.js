const getRuleLimit = (rules, ruleName) =>
  rules.find(rule => rule.name === ruleName)?.args.limit;

module.exports = { getRuleLimit };
