const express = require("express");
const fs = require('fs');

const app = express();


app.get("/", (res, req) => {
    res.send("INDEX");
});
const port = 5000;

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
        "site": {
            "elements": {
                "doctype": "<!DOCTYPE html>",
                "html": {
                    "open": "<html lang='en'>",
                    "close": "</html>"
                },
                "head": {
                    "open": "<head>",
                    "close": "</head>",
                    "elements": {
                        "meta": {
                            "charset": "<meta charset='UTF-8'>",
                            "viewport": "<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
                        },
                        "link": {
                            "semantic-ui": "<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css' integrity='sha256-ncjDAd2/rm/vaNTqp7Kk96MfSeHACtbiDU9NWKqNuCI=' crossorigin='anonymous'>",
                            "custom-style": "<link rel='stylesheet' href='src/css/style.css'>"
                        },
                        "title": {
                            "open": "<title>",
                            "text": "Coding Visuals",
                            "close": "</title>"
                        }
                    }
                },
                "body": {
                    "open": "<body>",
                    "elements": {
                        "header": {
                            "open": "<header>",
                            "elements": {
                                "div": {
                                    "open": "<div class='ui container margin-top-small margin-bottom-medium'>",
                                    "elements": {
                                        "h1": {
                                            "open": "<h1 class='ui header'>",
                                            "text": "Coding Visuals",
                                            "close": "</h1>"
                                        },
                                        "p": {
                                            "open": "<p>",
                                            "text": "Webbook for Coding Concepts and Technologies",
                                            "close": "</p>"
                                        }
                                    },
                                    "close": "</div>",
                                }
                            },
                            "close": "</header>"
                        },
                        "nav": {
                            "open": "<nav>",
                            "elements": {
                                "div": {
                                    "open": "<div class='ui menu margin-bottom-large'>",
                                    "elements": {
                                        "div": {
                                            "open": "<div class='header item'>",
                                            "text": "Coding Visuals",
                                            "close": "</div>"
                                        },
                                        "a": {
                                            "open": "<a class='item'>",
                                            "text": "",
                                            "close": "</a>"
                                        }
                                    },
                                    "close": "</div>"
                                }
                            },
                            "close": "</nav>"
                        },
                        "main": {
                            "open": "<main>",
                            "elements": {
                                "section": {
                                    "open": "<section class='category'>",
                                    "elements": {
                                        "div": {
                                            "open": "<div class='ui container center aligned margin-bottom-large'>",
                                            "elements": {
                                                "h2": {
                                                    "open": "<h2 class='ui icon header'>",
                                                    "elements": {},
                                                    "close": "</h2>"
                                                }
                                            },
                                            "close": "</div>"
                                        },
                                        "section": {
                                            "open": "<section class='courses-source'>",
                                            "elements": {
                                                "div": {
                                                    "open": "<div class='ui container margin-top-small margin-bottom-small'>",
                                                    "elements": {
                                                        "h3": {
                                                            "open": "<h3 class='ui horizontal divider header small'>",
                                                            "text": "",
                                                            "close": "</h3>"
                                                        }
                                                    },
                                                    "close": "</div>"
                                                },
                                                "div": {
                                                    "open": "<div class='ui container margin-top-small margin-bottom-small'>",
                                                    "elements": {
                                                        "div": {
                                                            "open": "<div class='ui list'>",
                                                            "elements": {
                                                                "a": {
                                                                    "open": "<a class='item'>",
                                                                    "elements": {
                                                                        "i": {
                                                                            "open": "<i class='large middle aligned circle outline icon'></i>",
                                                                            "close": "</i>"
                                                                        },
                                                                        "div": {
                                                                            "open": "<div class='content'>",
                                                                            "elements": {
                                                                                "div": {
                                                                                    "open": "<div class='header'>",
                                                                                    "text": "",
                                                                                    "close": "</div>"
                                                                                },
                                                                                "div": {
                                                                                    "open": "<div class='description'>",
                                                                                    "text": "",
                                                                                    "close": "</div>"
                                                                                }
                                                                            },
                                                                            "close": "</div>"
                                                                        }
                                                                    },
                                                                    "close": "</a>"
                                                                }
                                                            },
                                                            "close": "</div>"
                                                        }
                                                    },
                                                    "close": "</div>"
                                                }
                                            },
                                            "close": "</section>" 
                                        }
                                    },
                                    "close": "</section>"
                                }
                            },
                            "close": "</main>"
                        }
                    },
                    "scripts": {
                        "jquery": "<script src='https://code.jquery.com/jquery-3.3.1.min.js' integrity='sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=' crossorigin='anonymous'></script>",
                        "semantic-ui": "<script src='https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.js' integrity='sha256-VQRL2nOqSBiLUuANrKpUCC2U6XUeJB41gbZHvknlLcE=' crossorigin='anonymous'></script>",
                        "firebase": "<script src='https://www.gstatic.com/firebasejs/5.4.0/firebase.js'></script>",
                        "firebase-config": "<script src='../config/configw.js'></script>",
                        "custom-script-site": "<script src='src/js/site.js'></script>"
                    },
                    "close": "</body>",
                    "variations": {
                        "category": {
                            "frontend-technologies": {
                                "i": {
                                    "open": "<i class='html5 icon inline-block'>",
                                    "close": "</i>"
                                },
                                "i": {
                                    "open": "<i class='css3 alternate icon inline-block'>",
                                    "close": "</i>"
                                },
                                "div": {
                                    "open": "<div class='content'>",
                                    "text": "Frontend Technologies",
                                    "elements": {
                                        "div": {
                                            "open": "<div class='sub header'>",
                                            "text": "Courses dedicated to frontend technologies like HTML, CSS including their libraries and frameworks",
                                            "close": "</div>"
                                        }
                                    },
                                    "close": "</div>"
                                }
                            },
                            "frontend-scripting": {
                                "i": {
                                    "open": "<i class='js icon inline-block'>",
                                    "close": "</i>"
                                },
                                "div": {
                                    "open": "<div class='content'>",
                                    "text": "Frontend Scripting",
                                    "elements": {
                                        "div": {
                                            "open": "<div class='sub header'>",
                                            "text": "Courses dedicated to frontend scripting technologies like Javascript and its libraries and frameworks",
                                            "close": "</div>"
                                        }
                                    },
                                    "close": "</div>"
                                }
                            },
                            "backend-technologies": {
                                "i": {
                                    "open": "<i class='node icon inline-block'>",
                                    "close": "</i>"
                                },
                                "div": {
                                    "open": "<div class='content'>",
                                    "text": "Backend Technologies (No-SQL)",
                                    "elements": {
                                        "div": {
                                            "open": "<div class='sub header'>",
                                            "text": "Courses dedicated to backend technologies like NodeJS and its libraries and frameworks",
                                            "close": "</div>"
                                        }
                                    },
                                    "close": "</div>"
                                }
                            }
                        }
                    }
                }
            },
            createHTML: function() {
                // References to elements
                const tags = this.elements;
                const head = tags.head.elements;
                const body = tags.body.elements;

                const header = body.header.elements;
                const header_div = header.div.elements;

                const nav = body.nav.elements;
                const nav_div = nav.div.elements;

                const main = body.main.elements;
                const section_category = main.section.elements;

                const scripts = tags.body.scripts;

/* Major components to be included in the page */

// <head> element
const headElements = `${head.meta.charset}
        ${head.meta.viewport}
        ${head.link["semantic-ui"]}
        ${head.link["custom-style"]}
        ${head.title.open}${head.title.text}${head.title.close}`;

// <header> element
const headerComponent = `${body.header.open}
            ${header.div.open}
                ${header_div.h1.open}${header_div.h1.text}${header_div.h1.close}
                ${header_div.p.open}${header_div.p.text}${header_div.p.close}
            ${header.div.close}
        ${body.header.close}`;

// <nav> element
const linksArray = [
    { "url": "res/resources.html", "text": "Resources" },
    { "url": "res/links.html", "text": "Links" }
];
// Generating links
const generatedLinks = this.generateLinks(linksArray);
const navComponent = `
        ${body.nav.open}
            ${nav.div.open}
                ${nav_div.div.open}${nav_div.div.text}${nav_div.div.close}
                ${generatedLinks}
            ${nav.div.close}
        ${body.nav.close}
`;

// <main> element

const categories = this.generateCategoryArray();
const frontendTechnologiesSection = this.generateFrontendTechnologiesCategory(categories);
const frontendScriptingSection = this.generateFrontendScriptingCategory(categories);
const backendTechnologiesSection = this.generateBackendTechnologiesCategory(categories);
const categoryComponents = frontendTechnologiesSection + frontendScriptingSection + backendTechnologiesSection;


const mainComponent = `${body.main.open}${categoryComponents}
        ${body.main.close}
`;


// The entire page
const htmlPage = `${tags.doctype}
${tags.html.open}
    ${tags.head.open}
        ${headElements}
    ${tags.head.close}
    ${tags.body.open}
        ${headerComponent}
        ${navComponent}
        ${mainComponent}
        ${scripts.jquery}
        ${scripts["semantic-ui"]}
        ${scripts.firebase}
        ${scripts["firebase-config"]}
        ${scripts["custom-script-site"]}
    ${tags.body.close}
${tags.html.close}
`;
                
                // Generating the .html page
                fs.writeFileSync("site/index.html", htmlPage);
            },
            generateLinks: function(links) {
                let linksString = "";
                links.forEach(link => {
                    let linkElement = `
                <a href='${link.url}' class='item'>${link.text}</a>`;
                    linksString += linkElement;
                });
                return linksString;
            },
            generateCategoryArray: function() {
                const dbObj = structure.database.readDb();
                const courses = Object.keys(dbObj);
                const categories = {
                    "frontend-technologies": [],
                    "frontend-scripting": [],
                    "backend-technologies": []
                };
                courses.forEach(course => {
                    if (dbObj[course].category === "frontend-technologies") {
                        categories["frontend-technologies"].push(course);
                    }
                    if (dbObj[course].category === "frontend-scripting") {
                        categories["frontend-scripting"].push(course);
                    }
                    if (dbObj[course].category === "backend-technologies") {
                        categories["backend-technologies"].push(course);
                    }
                });
                return categories;
            },
            generateFrontendScriptingCategory: function(categories) {
                if (categories["frontend-scripting"].length > 0) {
                    let courseSourceSections = this.generateCourseSourceSections(categories["frontend-scripting"]);
                    let section = `
            <section class="category">
                <div class="ui container center aligned margin-bottom-large">
                    <h2 class="ui icon header">
                        <i class="js icon inline-block"></i>
                        <div class="content">
                            Frontend Scripting
                            <div class="sub header">Courses dedicated to frontend scripting technologies like Javascript and its libraries and frameworks</div>
                        </div>
                    </h2>
                </div>${courseSourceSections}
            </section>`;
                    return section;
                } else {
                    return "";
                }
            },
            generateFrontendTechnologiesCategory: function(categories) {
                if (categories["frontend-technologies"].length > 0) {
                    let courseSourceSections = this.generateCourseSourceSections(categories["frontend-technologies"]);
                    let section = `
            <section class="category">
                <div class="ui container center aligned margin-bottom-large">
                    <h2 class="ui icon header">
                        <i class="html5 icon inline-block"></i>
                        <i class="css3 alternate icon inline-block"></i>
                        <div class="content">
                            Frontend Technologies
                            <div class="sub header">Courses dedicated to frontend technologies like HTML, CSS including their libraries and frameworks</div>
                        </div>
                    </h2>
                </div>${courseSourceSections}
            </section>`;
                    return section;
                } else {
                    return "";
                }
            },
            generateBackendTechnologiesCategory: function(categories) {
                if (categories["frontend-technologies"].length > 0) {
                    let courseSourceSections = this.generateCourseSourceSections(categories["backend-technologies"]);
                    let section = `
            <section class="category">
                <div class="ui container center aligned margin-bottom-large">
                    <h2 class="ui icon header">
                        <i class="node icon inline-block"></i>
                        <div class="content">
                            Backend Technologies (No-SQL)
                            <div class="sub header">Courses dedicated to backend technologies like NodeJS and its libraries and frameworks</div>
                        </div>
                    </h2>
                </div>${courseSourceSections}
            </section>`;
                    return section;
                } else {
                    return "";
                }
            },
            generateCourseSourceSections: function(coursesArray) {
                const dbObj = structure.database.readDb();
                const udemyCourses = [];
                coursesArray.forEach(course => {
                    let courseUrl = dbObj[course].url;
                    let courseSourceName = courseUrl.split("/")[2].split(".")[1];
                    if (courseSourceName === "udemy") {
                        udemyCourses.push(course)
                    }
                });
                let sections;
                if (udemyCourses.length > 0) {
                    sections = this.createCourseSourceHTML(udemyCourses, "udemy");
                }
                return sections;
            },
            createCourseSourceHTML: function(coursesArray, courseSource) {
                if (courseSource === "udemy") {
                    const dbObj = structure.database.readDb();
                    let courseSourceItems = "";

                    coursesArray.forEach(course => {
                        let courseTitle = dbObj[course].title;
                        let courseSourceItem = `
                            <a href='${course}/index.html' class="item">
                                <i class="large middle aligned circle outline icon"></i>
                                <div class="content">
                                    <div class="header">Udemy</div>
                                    <div class="description">${courseTitle}</div>
                                </div>
                            </a>`;
                        courseSourceItems += courseSourceItem;
                    });

                    const section = `
                <section class="courses-source">
                    <div class="ui container margin-top-small margin-bottom-small">
                        <h3 class="ui horizontal divider header small">
                            Udemy
                        </h3>
                    </div>
                    <div class="ui container margin-top-small margin-bottom-small">
                        <div class="ui list">${courseSourceItems}
                        </div>
                    </div>
                </section>`;
                    return section;
                }
            }
        },
        "courses": {
            createCourses: function() {
                let dbObj = structure.database.readDb();
                let coursesArray = Object.keys(dbObj);
                coursesArray.forEach(course => {
                    this.createCourseDirectory(course);
                });
            },
            createCourseDirectory: function(course) {
                const dir = `./site/${course}`;
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                this.createCourseHTML(course);
            },
            createCourseHTML: function(course) {
                const dbObj = structure.database.readDb();
                const courseTitle = dbObj[course].title;

                const linksArray = [
                    { "url": "../index.html", "text": "Back" },
                    { "url": "../res/resources.html", "text": "Resources" },
                    { "url": "../res/links.html", "text": "Links" }
                ];
                // Generating links
                const generatedLinks = structure.site.generateLinks(linksArray);

                // Generating sections
                const generatedSections = structure.sections.generateSectionHTML(course);

                const coursePage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css' integrity='sha256-ncjDAd2/rm/vaNTqp7Kk96MfSeHACtbiDU9NWKqNuCI=' crossorigin='anonymous'>
    <link rel='stylesheet' href='../src/css/style.css'>
    <title>Coding Visuals</title>
</head>
<body>
    <header>
        <div class="ui container margin-top-small margin-bottom-medium">
            <h1 class="ui header">Coding Visuals</h1>
            <p>Webbook for Coding Concepts and Technologies</p>
        </div>
    </header>

    <nav>
        <div class="ui menu margin-bottom-large">
            <div class="header item">
                Coding Visuals
            </div>
            ${generatedLinks}
        </div>
    </nav>

    <main>
        <div class="ui container center aligned margin-bottom-large">
            <h2>${courseTitle}</h2>
        </div>
        ${generatedSections}
    </main>
    <script src='https://code.jquery.com/jquery-3.3.1.min.js' integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=' crossorigin='anonymous'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.js' integrity='sha256-VQRL2nOqSBiLUuANrKpUCC2U6XUeJB41gbZHvknlLcE=' crossorigin='anonymous'></script>
    
    <script src='https://www.gstatic.com/firebasejs/5.4.0/firebase.js'></script>
    <script src='../../config/configw.js'></script>
    
    <script src='../src/js/course.js'></script>
</body>
</html>`;
                fs.writeFileSync(`site/${course}/index.html`, coursePage);
            }
        },
        "sections": {
            createSectionStructure: function() {
                let dbObj = structure.database.readDb();
                let coursesArray = Object.keys(dbObj);
                coursesArray.forEach(course => {
                    let courseContentsArray = Object.keys(dbObj[course]);
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
                const dir = `./site/${course}/${section}`;
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
            },
            generateSectionHTML: function(course) {
                const dbObj = structure.database.readDb();
                const courseElementsArray = Object.keys(dbObj[course]);

                const sectionsArray = courseElementsArray.filter(element => {
                    return element.substring(0, 7) === "section";
                });

                let sectionHTML = "";
                sectionsArray.forEach(section => {
                    sectionHTML += this.createSectionHTMLComponents(dbObj, course, section);
                });
                return sectionHTML;
            },
            createSectionHTMLComponents: function(dbObj, course, section) {
                let sectionNum = section.split("-")[1];
                const sectionNumber = this.removeLeadingZeros(sectionNum);
                
                const sectionTitle = dbObj[course][section].title;

                const chapterList = this.generateSectionChaptersHTML(dbObj, course, section);

                const sectionHTML = `
        <section class="section">
            <div class="ui container right aligned margin-top-small margin-bottom-small">
                <h3 class="ui horizontal divider header tiny">
                    <i class="circle outline icon"></i>
                    Section ${sectionNumber}
                </h3>
                <p class="ui details section-title">${sectionTitle}</p>
            </div>

            <div class="ui container margin-top-small margin-bottom-small">
                <div class="ui list">
                    ${chapterList}
                </div>
            </div>
        </section>
        `;

                return sectionHTML;
            },
            removeLeadingZeros: function(numberString) {
                if (numberString.length === 3) {
                    let numberStringArray = numberString.split("");
                    if (numberStringArray[0] == "0") {
                        numberString = `${numberStringArray[1]}${numberStringArray[2]}`
                    }
                }
                if (numberString.length === 2) {
                    let numberStringArray = numberString.split("");
                    if (numberStringArray[0] == "0") {
                        numberString = `${numberStringArray[1]}`
                    }
                }
                return numberString;
            },
            generateSectionChaptersHTML: function(dbObj, course, section) {
                const sectionElementsArray = Object.keys(dbObj[course][section]);
                const sectionChapters = sectionElementsArray.filter(element => element.substring(0, 7) === "chapter");
                
                let chapterHTML = "";

                sectionChapters.forEach(chapter => {
                    let chapterTitle = dbObj[course][section][chapter].title;
                    let chapterNumber = dbObj[course][section][chapter].chapterNum;
                    chapterHTML += `
                    <a href='${section}/${chapter}.html' class="item">
                        <i class="large middle aligned circle outline icon"></i>
                        <div class="content">
                            <div class="header">Chapter ${chapterNumber}</div>
                            <div class="description">${chapterTitle}</div>
                        </div>
                    </a>
                    `;
                });
                return chapterHTML;
            }
        },
        
        "chapters": {
            createChapters: function() {
                const dbObj = structure.database.readDb();
                const coursesArray = Object.keys(dbObj);

                // Looping through each course
                coursesArray.forEach(course => {

                    const courseElements = Object.keys(dbObj[course]);
                    const sectionsArray = courseElements.filter(element => element.substring(0, 7) === "section");

                    // Looping through each section
                    sectionsArray.forEach(section => {
                        
                        const sectionElements = Object.keys(dbObj[course][section]);
                        const chaptersArray = sectionElements.filter(element => element.substring(0, 7) === "chapter");

                        // Looping through chapters
                        chaptersArray.forEach(chapter => {
                            const courseTitle = dbObj[course].title;
                            const sectionNumber = dbObj[course][section].sectionNum;
                            const sectionTitle = dbObj[course][section].title;
                            const chapterTitle = dbObj[course][section][chapter].title;
                            let chapterPage = `<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css' integrity='sha256-ncjDAd2/rm/vaNTqp7Kk96MfSeHACtbiDU9NWKqNuCI=' crossorigin='anonymous'>
    <link rel='stylesheet' href='../../src/css/style.css'>
    <title>${chapterTitle}</title>
</head>
<body>
    <header>
        <div class="ui container margin-top-small margin-bottom-medium">
            <h1 class="ui header">${courseTitle}</h1>
            <p>Section ${sectionNumber}: ${sectionTitle}</p>
        </div>
    </header>

    <nav>
        <div class="ui menu margin-bottom-large">
            <div class="header item">
                Coding Visuals
            </div>
            <a href='../index.html' class="item">
                Back
            </a>
            <a href='../../res/resources.html' class="item">
                Resources
            </a>
            <a href='../../res/links.html' class="item">
                Links
            </a>
        </div>
    </nav>

    <main>
        <div class="ui container center aligned margin-bottom-large">
            <h2>${chapterTitle}</h2>
        </div>
        <section class='notes'></section>
    </main>

    <script src='https://code.jquery.com/jquery-3.3.1.min.js' integrity='sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=' crossorigin='anonymous'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.js' integrity='sha256-VQRL2nOqSBiLUuANrKpUCC2U6XUeJB41gbZHvknlLcE=' crossorigin='anonymous'></script>
    
    <script src='https://www.gstatic.com/firebasejs/5.4.0/firebase.js'></script>
    <script src='../../../config/configw.js'></script>
    
    <script src='../../src/js/chapter.js'></script>
</body>
                            `;
                            fs.writeFileSync(`site/${course}/${section}/${chapter}.html`, chapterPage);
                        });

                    });
                });
            }
        },
        init: function() {
            structure.courses.createCourses();
            structure.sections.createSectionStructure();
            structure.site.createHTML();
            structure.chapters.createChapters();
        }
    }
    
    structure.init();
    
    
    
    
    
});