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
    },
    getProductsById: function(id){
        let product = null;
        data.products.forEach(function(prd){
            if(prd.id==id){
                product=prd;
            }
        })

        return product;

    },
    setCurrentProduct: function(product){
        data.selectedProduct= product;
    },
    getCurrentProduct:function(){
        return data.selectedProduct;
    },
    addProduct: function(name,price){
        let id;
        if(data.products.length>0){
            id= data.products[data.products.length-1].id+1;
        }else{
            id=0;
        }
        const newProduct= new Product(id,name,parseFloat(price));
        data.products.push(newProduct);
        return newProduct;
    },
    updateProduct: function(name,price){
        let product= null;

        data.products.forEach(function(prd){
            if(prd.id == data.selectedProduct.id){
                prd.name= name;
                prd.price= parseFloat(price);
                product=prd;
            }
        });

        return product
    },
    GetTotal : function(){
        let total=0;
        data.products.forEach(function(item){
            total+=item.price;
        });
        data.totalPrice=total;
        return data.totalPrice;
    }
}

})();


//UI contoller modülü

const UIController = (function(){

    const Selectors = {
        productList : "#item-list",
        productListItems: "#item-list tr",
        addButton : '.addBtn',
        updateButton: 'updateBtn',
        cancelButton: 'cancelBtn',
        deleteButton: 'deleteBtn',
        productName: '#productName',
        productPrice: '#productPrice',
        productCard : '#productCard',
        totalTl: '#totalTL',
        totalDolar:'#totalDolar'

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
                            <i class="far fa-edit edit-product"></i>
                        </td>
                    </tr>
                `;
            });
            document.querySelector(Selectors.productList).innerHTML= html;
        },
        getSelectors : function(){
            return Selectors;
        },
        addProduct : function(prd){
            document.querySelector(Selectors.productCard).style.display='block';
            var item =`
                    <tr>
                        <td>${prd.id}</td>
                        <td>${prd.name}</td>
                        <td>${prd.price}$</td>
                        <td class="text-right">
                                <i class="far fa-edit edit-product"></i>
                        </td>
                    </tr>
            `;

            document.querySelector(Selectors.productList).innerHTML+= item;
        },
        updateProduct: function(prd){

            let updatedItem=null;
            let items = document.querySelectorAll(Selectors.productListItems);
            items.forEach(function(item){
                if(item.classList.contains('bg-warning')){
                    item.children[1].textContent= prd.name;
                    item.children[2].textContent= prd.price + '$';
                    updatedItem = item;
                }
            })

        },
        clearInputs : function(){
            document.querySelector(Selectors.productName).value='';
            document.querySelector(Selectors.productPrice).value='';
        },
        hideCard : function(){
            document.querySelector(Selectors.productCard).style.display='none';
        },
        showTotal: function(total){
            document.querySelector(Selectors.totalDolar).textContent= total;
            document.querySelector(Selectors.totalTl).textContent = total*14.70;
        },
        addProductToForm:function(){
            const selectedProduct=  ProductController.getCurrentProduct();
            document.querySelector(Selectors.productName).value = selectedProduct.name;
            document.querySelector(Selectors.productPrice).value = selectedProduct.price;

        },
        addingState:function(){
            if(item){
                item.classList.remove('bg-warning');
            }
            
            UIController.clearInputs();
            document.querySelector(Selectors.addButton).style.display='inline';
            document.querySelector(Selectors.updateButton).style.display='none';
            document.querySelector(Selectors.deleteButton).style.display='none';
            document.querySelector(Selectors.cancelButton).style.display='none';

        },
        editState:function(tr){
            const parent= tr.parentNode;
            for(let i=0;i<parent.children.length;i++){
                parent.children[i].classList.remove('bg-warning');
            }

            tr.classList.add('bg-warning');
            document.querySelector(Selectors.addButton).style.display='none';
            document.querySelector(Selectors.updateButton).style.display='inline';
            document.querySelector(Selectors.deleteButton).style.display='inline';
            document.querySelector(Selectors.cancelButton).style.display='inline';

        }
    }

})();


//Ana modül App Controller

const App = (function(ProductCtrl,UICtrl){
    const UISelectors = UICtrl.getSelectors();

    //Load Event Listener
    const loadEventListeners =function(){
        //add product event
        document.querySelector(UISelectors.addButton).addEventListener('click',productAddSubmit);

        //edit product click
        document.querySelector(UISelectors.productList).addEventListener('click',productEditClick);

        //edit product submit
        document.querySelector(UISelectors.updateButton).addEventListener('click',editProductSubmit);
        

    }
    const productAddSubmit= function(e){
        const productName= document.querySelector(UISelectors.productName).value;
        const productPrice= document.querySelector(UISelectors.productPrice).value;
        
        if(productName!=='' && productPrice!==''){
            //add product
           const newProduct = ProductCtrl.addProduct(productName,productPrice);

           //add item to list
           UICtrl.addProduct(newProduct);

           //get total
           const total= ProductCtrl.GetTotal();

           //show total
           UICtrl.showTotal(total);

           //clear inputa
           UICtrl.clearInputs();

        }
  
        e.preventDefault();
    }
    const productEditClick= function(e){

        if(e.target.classList.contains('edit-product')){
            const id = e.target.parentNode.previousElementSibling.previousElementSibling.textContent;

           //get selected product
           const product = ProductCtrl.getProductsById(id);
           
           //set current product
           ProductCtrl.setCurrentProduct(product);

           //add product to UI
           UICtrl.addProductToForm();

           UICtrl.editState(e.target.parentNode.parentNode);
        }

    }
    const editProductSubmit=function(e){
        const productName=document.querySelector(UISelectors.productName.value);
        const productPrice=document.querySelector(UISelectors.productPrice.value);

        if(productName!==''&& productPrice!==''){

            //update product
            const updatedProduct = ProductCtrl.updateProduct(productName,productPrice);

            //update ui
           let item = UICtrl.updateProduct(updatedProduct);
           //get total
           const total= ProductCtrl.GetTotal();

           //show total
           UICtrl.showTotal(total);
           UICtrl.addingState(item);
        }
        

        e.preventDefault();
    }

    return {
        init: function(){
            console.log('starting app...');

            UICtrl.addingState();
            const products = ProductCtrl.getProducts();

            if(products.length==0){
                UICtrl.hideCard();
            }else{
                UICtrl.createProductList(products);
            }
            
            //load event listener
            loadEventListeners();

            
        }
    }


})(ProductController,UIController);

App.init();



