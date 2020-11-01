const subject = require('../lib/fs-flare')

test('isFile', function() {
  expect(subject._isFile('./test/data/d1')).toBe(false)
  expect(subject._isFile('./test/data/f1.txt')).toBe(true)
})

test('basename', function() {
  expect(subject._basename('./test/data/f1.txt')).toBe('f1.txt')
})

test('lineCount', function() {
  expect(subject._lineCount('./test/data/f1.txt')).toBe(3)
  expect(subject._lineCount('./test/data/f2.txt')).toBe(1)
})

test('getChildren', function() {
  expect(subject._getChildren('./test/data/d1')).toEqual([
    'test/data/d1/d2/',
    'test/data/d1/f4.txt',
    'test/data/d1/f5.txt',
    'test/data/d1/f6.txt'
  ])
  expect(subject._getChildren('./test/data/d1', ['f4.txt'])).toEqual([
    'test/data/d1/d2/',
    'test/data/d1/f5.txt',
    'test/data/d1/f6.txt'
  ])
})

test('run one level', function() {
  expect(subject.run('./test/data/d1/d2')).toEqual({
    name: 'd2',
    children: [
      {
        name: 'f7.txt',
        value: 1
      },
      {
        name: 'f8.txt',
        value: 1
      },                
    ]
  })
})

test('run two levels', function() {
  expect(subject.run('./test/data/d1')).toEqual({
    name: 'd1',
    children: [
      {
        name: 'd2',
        children: [
          {
            name: 'f7.txt',
            value: 1
          },
          {
            name: 'f8.txt',
            value: 1
          },                
        ]
      },
      {
        name: 'f4.txt',
        value: 1
      },
      {
        name: 'f5.txt',
        value: 1
      },
      {
        name: 'f6.txt',
        value: 1
      },
    ]
  })
})

test('run', function() {
  expect(subject.run('./test/data')).toEqual({
    name: "data",
    children: [
      {
        name: 'd1',
        children: [
          {
            name: 'd2',
            children: [
              {
                name: 'f7.txt',
                value: 1
              },
              {
                name: 'f8.txt',
                value: 1
              },                
            ]
          },
          {
            name: 'f4.txt',
            value: 1
          },
          {
            name: 'f5.txt',
            value: 1
          },
          {
            name: 'f6.txt',
            value: 1
          },
        ]
      },    
      {
        name: 'd3',
        children: [
          {
            name: 'f10.txt',
            value: 1
          },                
          {
            name: 'f11.txt',
            value: 1
          },                
          {
            name: 'f9.txt',
            value: 1
          },
        ]
      },  
      {
        name: 'f1.txt',
        value: 3
      },
      {
        name: 'f2.txt',
        value: 1
      },
      {
        name: 'f3.txt',
        value: 1
      },
    ]
  })
})

test('run with ignore', function() {
  expect(subject.run('./test/data', ['f1.txt', 'd3/'])).toEqual({
    name: "data",
    children: [
      {
        name: 'd1',
        children: [
          {
            name: 'd2',
            children: [
              {
                name: 'f7.txt',
                value: 1
              },
              {
                name: 'f8.txt',
                value: 1
              },                
            ]
          },
          {
            name: 'f4.txt',
            value: 1
          },
          {
            name: 'f5.txt',
            value: 1
          },
          {
            name: 'f6.txt',
            value: 1
          },
        ]
      },    
      {
        name: 'f2.txt',
        value: 1
      },
      {
        name: 'f3.txt',
        value: 1
      },
    ]
  })
})
