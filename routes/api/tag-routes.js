const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagName = await Tag.findAll({ 
      // be sure to include its associated Product data
      include: [
        { model: Product, through: ProductTag, as: 'productTag' }
      ],
    });

    if(!tagName) {
      res.status(404).json({ message: 'No tags were found!'});
      return;
    }
    res.status(200).json(tagName);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    console.log('get /api/tags/:id called with:', req.params.id);

    // const productTags = await ProductTag.findAll({
    //   where: { tag_id: req.params.id },
    // });
    // console.log('productTags:', productTags);
    // const productIds = productTags.map(pt => pt.dataValues.product_id);
    // console.log('productIds:', productIds);

    // The "as:" MUST match what is described in models/index.js Tag.belongsToMany(Product)
    const tagName = await Tag.findByPk(req.params.id, {
      include: [
        { model: Product, through: ProductTag, as: 'productTag' }
      ],
    });
    
    console.log('tagName:', tagName);
    if(!tagName) {
      res.status(404).json({ message: 'No tag found!'});
      return;
    }
    res.status(200).json(tagName);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
