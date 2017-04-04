var express = require('express');
var router = express.Router();
var Student = require('../models/student');

router.use(express.static(__dirname + '/public'));

/* GET home page. */
router.get('/students', function(req, res, next) {
  Student.find({}, function(err, students) {
    if (err) {
      console.log('Database Error:', err);
    } else {
      // console.log(students);
      //console.log(res);
       res.render('student', {
         title: 'Express',
         studentList: students
      });
    }
  });
});

router.post('/students', function(req, res, next) {
  Student.find({}, function(err, students) {

    if (err) {
      console.log('Database Error:', err);
    } else {

      /* Add a student */
      var newStudent = new Student({
        firstName: req.body.first,
        lastName: req.body.last
      });

      newStudent.save(function(err, newStudent){
        if(err){
          res.status(500).send({
            status: 'Error',
            error: err
          });
        } else {
          Student.find({}, function(err, students) {
            res.render('student', {
              title: 'Express',
              studentList: students
            })
          });
        }
      });
    }
  });
});

module.exports = router;

// var express = require('express');
// var router = express.Router();
// var Student = require('../models/student');
//
//
// /* Get a blog post */
// router.get('/:id',function(req,res,next){
//  Student.find({ _id: req.params.id },function(err,student){
//    if(err){ console.log(err); }
//
//    res.json(student);
//  });
// });
//
// /* Add a student */
// router.post('/',function(req,res,next){
//  var newStudent = new Student({
//    firstName: req.body.firstName,
//    lastName: req.body.lastName
//  });
//
//  newStudent.save(function(err, student){
//    if(err){
//      res.status(500).send({
//        status: 'Error',
//        error: err
//      });
//    } else {
//      res.status(200).json({
//        status: 'OK',
//        post: student
//      })
//    }
//  });
//
// });
//
// /* Update a student */
// router.patch('/',function(req,res,next){
//  Student.find({ _id: req.body.id }, function(err,post){
//    if(err) console.log(err);
//
//    post.firstname = req.body.firstname || post.firstname;
//    post.lastname = req.body.lastname || post.lastname;
//
//    post.save(function(err,student){
//      if(err) console.log(err);
//
//      res.json({
//        status: 'updated!',
//        updated_student: student
//      });
//    });
//  });
// });
//
//
//
// /* Delete a student */
// router.delete('/:id',function(req,res,next){
//
//   Student.deleteOne({ _id: req.params.id },function(err,student){
//     if(err){ console.log(err); }
//     res.json({
//        status: 'deleted!',
//        post: student
//      });
//   });
//
// });
// // router.delete('/',function(req,res,next){
// //  Post.findByIdAndDelete(req.body.id,function(err,student){
// //    if(err) console.log(err);
// //    res.json({
// //      status: 'deleted!',
// //      post: student
// //    });
// //  });
// // });
//
// module.exports = router;
