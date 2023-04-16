const Tour = require('../models/tour.model');
const APIFeatures = require('../utils/tourFeatures.utils')

// not required anymore bcz now we are working with db ->
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

const aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratings Average, price';
  req.query.fields = 'name, price, ratingsAverage, summary, difficulty';
  next();
};

const getAllTours = async (req, res) => {
  try {
    // Execute the query ->

    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tourData = await features.query;

    res.status(200).json({
      tourLength: tourData.length,
      data: {
        allTours: tourData,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: 'Check your backend',
    });
  }
};
const getSingleTour = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Tour.findOne({ name: id });
    res.status(200).json({ data });
    console.log(id);
  } catch (error) {
    res.status(400).json({
      message: 'Tour not found',
      error: error,
    });
  }
};

const addNewTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    // newTour.save();
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: error,
    });
  }
};

const deleteATour = async (req, res) => {
  try {
    const id = req.params.id;
    await Tour.findOneAndDelete({ name: id });
    res.status(200).json({
      message: 'Tour deleted successfully',
    });
  } catch (error) {
    await Tour.findOneAndDelete({ name: id });
    res.status(200).json({
      message: 'Not a valid tour',
    });
  }
};

const updateTour = async (req, res) => {
  try {
    const updateData = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      message: 'Tour updated successfully',
      tour: updateTour,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Something bad happend, I also dont know',
    });
  }
};

module.exports = {
  getAllTours,
  getSingleTour,
  addNewTour,
  deleteATour,
  updateTour,
  aliasTopTours,
};

// const addNewTour = (req, res) => {
//   // we will get id from tours and adding 1 on that id
//   const newId = tours[tours.length - 1].id + 1;
//   // creating new object and assigining it to id and req body
//   const newTour = Object.assign({ id: newId }, req.body);
//   // pushing this object to tours - > but it's getting assigned to tours which we get in the beginning
//   tours.push(newTour);
//   // Persistance assigning on over local file
//   fs.writeFile(
//     `${__dirname}/../dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       if (err) return console.log('Something bad happed here !!!');
//       res.status(201).json({
//         message: 'Success',
//         data: {
//           tours: newTour,
//         },
//       });
//     }
//   );
// };
