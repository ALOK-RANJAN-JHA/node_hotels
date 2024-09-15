const express = require('express');
const router = express.Router();
const menuItem = require('./../modules/menuItem');

// menuItem
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new menuItem(data);
        const response = await newMenu.save();
        console.log('data saved successfully');
        res.status(200).json(response);

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await menuItem.find();
        console.log('data fatched');
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Error' });
    }
});
router.get('/:taste', async (req, res) => {
    const taste = req.params.taste;
    try {
        if (taste == 'spicy' || taste == 'sweet' || taste == 'sour') {
            const response = await menuItem.find({ taste: taste });
            console.log('response fatched');
            res.status(200).json(response);
        }
        else {
            res.status(404).json({ error: 'Invalid WorkType' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Error' });
    }

});

// export the menuroutes file and import where we want
module.exports = router;
