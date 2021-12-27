const recipe = {
  id: 1,
  image:
    "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
  category: {
    id: 1,
    name: "Dinner",
  },
  name: "LEFTOVER MASHED POTATO PANCAKES",
  desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum sunt in culpa qui officia deserunt mollit anim id est laborum.",
  content:
    "Dignissim cras tincidunt lobortis feugiat vivamus at. Amet luctus venenatis lectus magna fringilla. Nibh tellus molestie nunc non blandit. Et magnis dis parturient montes nascetur ridiculus mus mauris vitae. Amet massa vitae tortor condimentum lacinia quis vel eros. Eros in cursus turpis massa tincidunt dui ut ornare. Est ante in nibh mauris cursus mattis molestie. Nec ullamcorper sit amet risus nullam eget felis eget. Tincidunt praesent semper feugiat nibh sed. Et leo duis ut diam quam nulla pottitor massa id. Convallis convallis tellus id interdum velit laoreet id. Enim ut sem viverra aliquet eget sit. Mollis aliquam ut porttitor leo a diam. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Velit egestas dui id ornares.",
  author: "Yan Lee",
  createdAt: "22 July 2019",
  ingredients: [
    {
      id: 1,
      name: "sugar",
      quantity: "3",
      unit: "coffee spoon",
    },
    {
      id: 2,
      name: "fish",
      quantity: "1",
      unit: "",
    },
  ],

  tags: [
    {
      id: 1,
      name: "fish",
    },
    {
      id: 2,
      name: "lunch",
    },
  ],
};

module.exports = recipe;
