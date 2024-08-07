var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/data/:id', async function(req, res, next) {

  const data = await prisma.questionaire.findFirst({
    where: {
      id: parseInt(req.params.id)
    },
  })

  res.json(data)
});

router.post('/answer/:id', async function(req, res, next) {

  const id = parseInt(req.params.id);
  const answer = req.body.answer;

  // Todo: DRY
  const data = await prisma.questionaire.findFirst({
    where: {
      id: parseInt(id)
    },
  })

  const updateUser = await prisma.questionaire.update({
    where: {
      id: parseInt(id),
    },
    data: {
      isDirty: true,
      answer: answer,
    },
  })

  res.json(updateUser)
});

router.get('/status', async function(req, res, next) {
  const total = await prisma.questionaire.count()
  const countAnswered = await prisma.questionaire.count({
    where: {
      isDirty: true,
    },
  })

  res.json({
    total,
    countAnswered
  })
})

module.exports = router;
