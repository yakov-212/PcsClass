import express from 'express';
import pool from '../pool.js';
const router = express.Router();

/* GET home page. */
router.get('/recipe-api', async function(req, res, next) {
  const [results] = await pool.execute(
    'SELECT * FROM recipes'
  )
  console.log(results)
  res.status(200).json(results).end()
  // res.render('index', { title: 'Express' });
});
router.route('/recipe-api/:id')
  .get(async function(req, res, next) {
    const [results] = await pool.execute(
      'SELECT * FROM recipes WHERE id = ?',
      [req.params.id]
    )

    console.log(results,'next',req.body)
    res.status(200).json(results).end()
    // res.render('index', { title: 'Express' });
  })
  .post(async function(req,res,next){
    const [results] = await pool.execute(
      'INSERT INTO recipes(name,ingredients,image) VALUES (?,?,?)',
      [req.body.name,req.body.ingredients,req.body.image]
    )
    res.status(201).location(`/recipe-api/${req.body.id}`).end()
  })
  .put(async function(req,res,next) {
    const [results] = await pool.execute(
      'UPDATE recipes SET name = ? ingredients = ? image = ? WHERE id = ?',
      [req.body.name,req.body.ingredients,req.body.image,req.body.id]
    )
    res.status(204).location(`/recipe-api/${req.body.id}`).end()
  })
  .delete(async function(req,res,next){
    const [results] = await pool.execute(
      'DELETE FROM recipes WHERE id = ?',
      [req.body.id]
    )
  });

export default router
