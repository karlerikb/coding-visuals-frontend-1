const express = require("express");
const fs = require('fs');

const app = express();

const port = 5000;

app.get("/", (res, req) => {
    res.send("INDEX");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    
    const structure = {
        "database": {
            readDb: function() {
                let rawdata = fs.readFileSync('db.json');  
                let dbObj = JSON.parse(rawdata);
                return dbObj;
            }
        },
        "courses": {
            createCourses: function() {
                let dbObj = structure.database.readDb();
                let coursesArray = Object.keys(dbObj.courses);
                coursesArray.forEach(course => {
                    this.createCourseDirectory(course);
                });
            },
            createCourseDirectory: function(course) {
                const dir = `./testing_structure/${course}`;
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
            }
        },
        "sections": {
            createSectionStructure: function() {
                let dbObj = structure.database.readDb();
                let coursesArray = Object.keys(dbObj.courses);
                coursesArray.forEach(course => {
                    let courseContentsArray = Object.keys(dbObj.courses[course]);
                    let sectionArray = [];
                    courseContentsArray.forEach(item => {
                        if (item.substring(0, 7) === "section") {
                            sectionArray.push(item);
                        }
                    });
                    this.createSections(course, sectionArray);
                });
            },
            createSections: function(course, sectionArray) {
                sectionArray.forEach(section => {
                    this.createSectionDirectory(course, section);
                })
            },
            createSectionDirectory: function(course, section) {
                console.log(course + " " + section);
                const dir = `./testing_structure/${course}/${section}`;
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
            }
        },
        init: function() {
            structure.courses.createCourses();
            structure.sections.createSectionStructure();
        }
    }
    
    structure.init();
    
    
    /*
    let courseContentsArray = Object.keys(dbObj.courses["course_1"]);
    console.log(courseContentsArray);
    let sectionArray = [];
    
    courseContentsArray.forEach(item => {
        if (item.substring(0, 7) === "section") {
            sectionArray.push(item);
        }
    });
    console.log(sectionArray);
    
    
    const doctype = "<!DOCTYPE html>";
    const htmlTagOpen = "<html lang='en'>";
    const htmlTagClose = "</html>";
    const headTagOpen = "<head>";
    const headTagClose = "</head>";
    const titleTags = "<title>TestTitle</title>"
    const bodyTagOpen = "<body>";
    const bodyTagClose = "</body>";
    
    
    const htmlString =
    `${doctype}
    ${htmlTagOpen}
    ${headTagOpen}
    ${titleTags}
    ${headTagClose}
    ${bodyTagOpen}
    <p>Test</p>
    ${bodyTagClose}
    ${htmlTagClose}`;
    
    console.log(htmlString); */
    
    /* coursesArray.forEach(course => {
        console.log(course);
        fs.writeFileSync(`testing_structure/test.html`, htmlString);
        
    }); */
    
    /* const dir = "./testing_structure/course_1/section_1";
    if (!fs.existsSync(dir)) {
        console.log("dir doesn't exist");
        fs.mkdirSync(dir);
    } else {
        console.log("dir exists");
    } */
    
    
    
});




