const dataset = [
  {
    id: 1,
    name: "title1",
    children: [{ id: 3, name: "title3", children: [{ id: 5, name: "title" }] }],
  },
  { id: 2, name: "title2", children: [{ id: 4, name: "title4" }] },
];

for (let i = 0; i < dataset.length; i++) {
  if (dataset[i].id == 2) {
    console;
  }
}

dataset.push({ id: 5, name: "title5" });

console.log(dataset);
