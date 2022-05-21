//modul oluşturma
//storage conrtoller modulü

const StorageConroller = (function(){


})();

//Product Controller modülü

const ProductController = (function(){

//private

const Product = function(id,name,price){
    this.id = id;
    this.name = name;
    this.price = price;
}

const data = {
    products : [
        {id:0, name: 'monitör', price: 100},
        {id:0, name: 'Ram', price: 30},
        {id:0, name: 'Klavye', price: 10}
    ],
    selectedProduct:null, //seçilen ürünü içine aktarır
    totalPrice:0 //listede bulunan elemanların fiyat toplamları
}
//public
return {
    getProducts: function(){
        return data.products;
    },
    getData: function(){
        return data;
    }
}

})();


//UI contoller modülü

const UIController = (function(){

    const Selectors = {
        productList : "#item-list",
        addButton : '.addBtn',
        productName: '#productName',
        productPrice: '#productPrice'

    }
    return {
        createProductList: function(products){
            let html='';
            products.forEach(prd => {
                html+=`
                    <tr>
                        <td>${prd.id}</td>
                        <td>${prd.name}</td>
                        <td>${prd.price}$</td>
                        <td class="text-right">
                            <button type="submit"  class="btn btn-warning btn-sm">
                                <i class="far fa-edit"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });
            document.querySelector(Selectors.productList).innerHTML= html;
        },
        getSelectors : function(){
            return Selectors;
        }
    }

})();


//Ana modül App Controller

const App = (function(ProductCtrl,UICtrl){
    const UISelectors = UIController.getSelectors();

    //Load Event Listener
    const loadEventListeners =function(){
        //add product event
        document.querySelector(UISelectors.addButton).addEventListener('click',productAddSubmit);

    }
    const productAddSubmit= function(e){
        const productName= document.querySelector(UISelectors.productName).value;
        const productPrice= document.querySelector(UISelectors.productPrice).value;
        console.log(productName,productPrice);
  
        e.preventDefault();
    }

    return {
        init: function(){
            console.log('starting app...');
            const products = ProductCtrl.getProducts();

            UICtrl.createProductList(products);
            
            //load event listener
            loadEventListeners();
        }
    }


})(ProductController,UIController);

App.init();



