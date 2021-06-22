const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryName = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product }]
    });

    if(!categoryName) {
      res.status(404).json({ message: 'No categories were found!'});
      return;
    }
    res.status(200).json(categoryName);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    // be sure to include its associated Products
    const categoryName = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!categoryName) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(categoryName);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
