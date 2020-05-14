const products = axios.get('https://acme-users-api-rev.herokuapp.com/api/products')
const companies = axios.get('https://acme-users-api-rev.herokuapp.com/api/companies')
const loadData = () => {
    Promise.all([products,companies])
        .then(([products,companies])=> {
            product = products.data
            company = companies.data
            render(product,company)
        })
    }
loadData()
const body = document.querySelector('#body')
const tableHead = document.querySelector('thead')
const tbody = document.querySelector('tbody')
const createHeader = () => {
    const headerContainer = document.createElement('div')
    const header = document.createElement('h1')
    header.innerHTML = 'Acme CDN\'s'
    headerContainer.append(header)
    body.append(headerContainer)
}
const createTags = (productLength, companyLength) => {
    const tagContainer = document.createElement('ul')
    tagContainer.classList.add('nav', 'nav-tabs')
    const productTag = document.createElement('li')
    const companyTag = document.createElement('li')
    productTag.classList.add('nav-item')
    companyTag.classList.add('nav-item')
    productTag.innerHTML = `<a class="nav-link active" href="#Products">Products(${productLength})</a>`
    companyTag.innerHTML = `<a class="nav-link active" href="#Companies">Companies(${companyLength})</a>`
    productTag.addEventListener('click', ev => {
        ev.stopPropagation()
        createProducts()
    })
    companyTag.addEventListener('click', ev => {
        ev.stopPropagation()
        createCompanies()
    })
    tagContainer.append(productTag)
    tagContainer.append(companyTag)
    body.append(tagContainer)
}
render = (product, company) => {
    createHeader()
    createTags(product.length, company.length)
}
const createProducts = () => {
    products.then(products => {
        const product = products.data;
        let htmlString = []
        for (let keys in product[0]){
            htmlString.push(`<th>${keys.toUpperCase()}</th>`)
        }
        tableHead.innerHTML = htmlString.join('')
        const productList = product.map(elem => {
            const list = () => {
                let listArr = []
                for (let keys in elem){
                    listArr.push(`<td>${elem[keys]}</td>`)
                }
                return listArr.join('')
            }
            return `
            <tr>
            ${list().toUpperCase()}
            </tr>`
        }).join('')
        tbody.innerHTML = productList
    })
}
const createCompanies = () => {
    companies.then(companies => {
        const company = companies.data;
        let htmlString = []
        for (let keys in company[0]){
            htmlString.push(`<th>${keys}</th>`)
        }
        tableHead.innerHTML = htmlString.join('')
        const companyList = company.map(elem => {
            const list = () => {
                let listArr = []
                for (let keys in elem){
                    listArr.push(`<td>${elem[keys]}</td>`)
                }
                return listArr.join('')
            }
            return `
            <tr>
            ${list().toUpperCase()}
            </tr>`
        }).join('')
        tbody.innerHTML = companyList
    })
}
createProducts()