import fs from "fs"
import path from "path";
import { PDFDocument } from 'pdf-lib'

const paths_images = [
    `${__dirname}/exemplos/pdf_sample_2.pdf`,
    `${__dirname}/exemplos/1200px-Exemplo.svg.png`,
    `${__dirname}/exemplos/exemplo-desenhos_csp14518596.jpeg`,
    `${__dirname}/exemplos/exemplo-design-sketch-name.png`
]
async function  run(){
    const doc = await PDFDocument.create()
    const streams_docs = paths_images.map( (path_doc) => {
        return {
            path_doc,
            "extensao":  path.extname(path_doc),
        }
    
    }
    )

    let  pdf_exits: PDFDocument  = await PDFDocument.load(fs.readFileSync(`${__dirname}/exemplos/pdf_sample_2.pdf`))
    const pages = await doc.copyPages(pdf_exits, pdf_exits.getPageIndices())
    pages.forEach( page => { 
        doc.addPage(page)
    
    })
    streams_docs.forEach(async  obj =>{
        if(obj.extensao.toLowerCase() == ".pdf"){
            console.log(obj.path_doc)
             pdf_exits = await PDFDocument.load(fs.readFileSync(obj.path_doc))
            const pages = await doc.copyPages(pdf_exits, pdf_exits.getPageIndices())
            pages.forEach( page => { 
                doc.addPage(page)
            
            })

        }

        const page = doc.addPage()
        if(obj.extensao.toLowerCase() == '.png'){
            const buffer = fs.readFileSync(obj.path_doc)
            // console.log(buffer)
            page.drawImage( await doc.embedPng(fs.readFileSync(obj.path_doc))
            ,{})
        }

        if(obj.extensao.toLowerCase() == '.jpeg'){
            const buffer = fs.readFileSync(obj.path_doc)
            // console.log(buffer)
            page.drawImage( await doc.embedJpg(fs.readFileSync(obj.path_doc)))
        }

        
    })
    
    
    doc.addPage().drawText('Hello World!');
    fs.writeFileSync('outpu3aa.pdf', await doc.save())

}    


run()
