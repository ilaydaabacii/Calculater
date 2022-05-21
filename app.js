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
    Product : [
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
        return data.Product;
    },
    getData: function(){
        return data;
    }
}

})();


//UI contoller modülü

const UIController = (function(){

    const Selectors = {
        productList : "#item-list"
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
            document.querySelector('Selector.productList').innerHTML= html;
        },
        getSelectors : function(){
            return Selectors;
        }
    }

})();


//Ana modül App Controller

const App = (function(ProductCtrl,UICtrl){

    return {
        init: function(){
            console.log('starting app...');
            const products = ProductCtrl.getProducts();

            UICtrl.createProductList(products);
        }
    }


})(ProductController,UIController);

App.init();



