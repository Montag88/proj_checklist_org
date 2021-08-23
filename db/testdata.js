const testTree = [
  {
    id: 10,
    expanded: true,
    data: 'hello',
    children: [
      {
        id: 40,
        expanded: true,
        data: 'does this work?',
        children: [],
      },
      {
        id: 50,
        expanded: true,
        children: [],
      },
    ],
  },
  { id: 20, expanded: true, children: [] },
  {
    id: 30,
    expanded: true,
    children: [
      {
        id: 60,
        expanded: true,
        children: [
          {
            id: 80,
            expanded: true,
            children: [],
          },
          {
            id: 90,
            expanded: true,
            children: [],
          },
        ],
      },
      {
        id: 70,
        expanded: true,
        data: 'please work',
        children: [],
      },
    ],
  },
];

module.exports = testTree;
