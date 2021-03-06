D.import_aliases({
  'do':     'list each block',
  'wait':   'process sleep for 0',
  'sleep':  'process sleep for',

  'grep':   'string grep on',
  'join':   'string join value',
  'split':  'string split value',

  '*':      'list pair data',
  'merge':  'list merge',
  'each':   'list each',
  'map':    'list map',
  'reduce': 'list reduce',
  'fold':   'list reduce',
  'sort':   'list sort',
  'group':  'list group',
  'filter': 'list filter',
  'count':  'list count data',
  'union':  'list union data',
  'unique': 'list unique data',
  'range':  'list range length',
  'first':  'list first',
  'zip':    'list zip data',
  'peek':   'list peek path',
  'poke':   'list poke value',

  'eq':     'logic is like',
  'is':     'logic is', // for 'is in'
  'if':     'logic if value',
  'then':   'logic if value __ then',
  'else':   'logic if value __ then __ else',
  'and':    'logic and value',
  'or':     'logic or value',
  'not':    'logic not value',
  'cond':   'logic cond value',
  'switch': 'logic switch value',

  'add':      'math add value',
  'plus':     'math add value',
  'minus':    'math subtract value',
  'subtract': 'math subtract value',
  'multiply': 'math multiply value',
  'times':    'math multiply value',
  'divide':   'math divide', // careful, this one is different
  'round':    'math round',
  'mod':      'math mod by',
  'less':     'math less',
  'min':      'math min value',
  'max':      'math max value',

  'run':      'process run block',
  'quote':    'process quote',
  'unquote':  'process unquote',
  'tap':      'process tap send',
})

