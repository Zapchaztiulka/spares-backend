// search for a specific rule with a given name within an array of rules and returns the value of a specified argument from that rule
function getPatternFromRules(rules, ruleName) {
  const rule = rules.find(rule => rule.name === ruleName);
  if (rule && rule.method === 'pattern' && rule.args.regex) {
    return rule.args.regex.source;
  }
  return null;
}

module.exports = { getPatternFromRules };
