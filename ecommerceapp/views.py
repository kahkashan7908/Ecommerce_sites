from django.shortcuts import render
from.models import ProductData,OrderData
from django.core.paginator import Paginator
# Create your views here.
def indexpage(request):
    product_data=ProductData.objects.all()
    
    #search code
    item_name=request.GET.get('item_name')
    if item_name!='' and item_name is not None:
        product_data= product_data.filter(title__icontains=item_name)

    #pagination code
    paginator = Paginator(product_data,4)
    page_num = request.GET.get('page')
    product_objects = paginator.get_page(page_num)
    return render(request,'index.html',{'data':product_objects})

#detail View
def DetailPage(request,id):
    data=ProductData.objects.get(id=id)
    return render(request,'detail.html',{'data':data})

def checkoutPage(request):
    if request.method=="GET":
        return render(request,'checkout.html')
    else:
        OrderData(
            items=request.POST['items'],
            name=request.POST['name'],
            email=request.POST['email'],
            address=request.POST['address'],
            city=request.POST['city'],
            state=request.POST['state'],
            zipcode=request.POST['zip'],
            total=request.POST['total'],
        ).save()
        return render(request,'placed.html')
        
        
    