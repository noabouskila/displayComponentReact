const PRODUCTS =[
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
]; 

// TABLEAU GLOBAL
class FilterableProductTable extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            filterText :"",
            inStockOnly : false
        }
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInstockChange = this.handleInstockChange.bind(this)
    }

    handleFilterTextChange(filterText){
        this.setState({filterText})
    }

    handleInstockChange(inStockOnly){
        this.setState({inStockOnly})
    }

    render(){
        const {products} = this.props
        const {filterText,inStockOnly} = this.state
        return <div className="mt-4">
            <h1 className="text-center mb-4">Composant d'affichage React avec filtres</h1>
            <SearchBar 
                filterText={filterText}
                inStockOnly={inStockOnly}
                onFilterCheckChange={this.handleFilterTextChange}
                onStockChange={this.handleInstockChange}
            /> 
            <ProductTable
                products={products}
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
            />
        </div>
    }
}

//BARRE DE RECHERCHE + CHECKBOX
class SearchBar extends React.Component{
    constructor(props){
        super(props)
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInstockChange = this.handleInstockChange.bind(this)
    }

    handleFilterTextChange(e){
        this.props.onFilterCheckChange(e.target.value)
    }
    handleInstockChange(e){
        this.props.onStockChange(e.target.checked)
    }

    render(){
        const {filterText , inStockOnly} = this.props
        return <div className="mb-3">
            <div className="form-group mb-0">
                <input type="text" className="form-control" placeholder="Search..." value={filterText}  onChange={this.handleFilterTextChange}></input> 
            </div>

            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="stock" checked={inStockOnly} onChange={this.handleInstockChange}></input>
                <label htmlFor="stock" className="form-check-label">Only show products in stock</label> 
            </div>
        </div>
    }
}

//TABLEAUX COMPRENANTS TOUS LE NOM ET PRIX DES PRODUITS
function ProductTable({products,filterText,inStockOnly}){
    const rows = [] // nouveau tableau qui va recevoir les categories et les produits grace a un forEach
    let lastCategory = null // derniere category pour savoir si les prochaines sont differents ou pareil que la derniere categorie

    // forEach pour parcourir les données du tableau et pousser les category et pdts
    products.forEach(product => {
        //pour n'afficher que ce qui est afficher dans le filtre ou checkbox
        if((inStockOnly === true && product.stocked ===false) || product.name.indexOf(filterText) === -1){
            return 
        }

        // si la categorie est differente de la derniere alors pusher
        if(product.category !== lastCategory){
            lastCategory = product.category // nouvelle categorie a pusher

            // inserer dans le nouveau tableau TOUJOURS AVEC UNE CLEFS
            rows.push(<ProductCategoryRow key={product.category} category={product.category}/>)
        }
        // inserer chaque ligne dans le nouveau tableau TOUJOURS AVEC UNE CLEFS
        rows.push(<ProductRow key={product.name} product={product}/>)
    })

    return  <div>
        <table className="table">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prix</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    </div>
}

//CATEGORIE DE PRODUIT
function ProductCategoryRow({category}){
    return <tr colSpan='2'>
        <th>{category}</th>
    </tr>
}

// CHAMP DE PRODUIT
function ProductRow({product}){
    // mettre le style css on le met dans un objet {{}}
    const name = product.stocked ? product.name : <span style={{color:"red"}}>{product.name}</span>
    return <tr>
        <td>{name}</td>
        <td>{product.price}</td>
    </tr>
}

//CONTENANT GLOBAL
function Home(){
    return <div className="container">
        <FilterableProductTable products={PRODUCTS}/>
    </div>
}
ReactDOM.render(<Home/>, document.getElementById("app"))