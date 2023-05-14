from django.shortcuts import render

# Create your views here.

from django.http import JsonResponse

from rest_framework.decorators import api_view # CRUD for Vicky (api_view),

from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView     # Authentication
from rest_framework.decorators import permission_classes     # Authentication
from rest_framework.permissions import IsAuthenticated     # Authentication  

from django.contrib.auth.models import User # import django built in user model


from .serializers import ProductSerializer
from .models import Product
from rest_framework.views import APIView
from rest_framework import status


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def about(req):
    # return JsonResponse('hello', safe=False)
    return Response("about - permission")


@api_view(['GET'])
def contact(req):
    return Response("contact - no permission required")


@api_view(['POST'])
def register(request):
    user = User.objects.create_user(
                username=request.data['username'],
                email=request.data['email'],
                password=request.data['password']
            )

    user.is_active = True
    user.is_staff = False # lets make false
    user.save()
    return Response("new user born")


# @permission_classes([IsAuthenticated])
class ProductView(APIView):
    """
    This class handle the CRUD operations for MyModel
    """
    def get(self, request, id=-1):
        """
        Handle GET requests to return a list of MyModel objects
        """
        if id > -1:
            try:
                prod = Product.objects.get(id=id)
                prod_serialized = ProductSerializer(prod, many=False)
                return Response(prod_serialized.data)
            except Product.DoesNotExist:
                return Response('Product Does Not Exist', status=status.HTTP_204_NO_CONTENT)
        else:
            prod = Product.objects.all()
            prod_serialized = ProductSerializer(prod, many=True)
            return Response(prod_serialized.data)
        
    def post(self, request):
        """
        Handle POST requests to create a new Product object
        """
        # usr =request.user
        # print(usr)
        serializer = ProductSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    def put(self, request, id):
        """
        Handle PUT requests to update an existing Product object
        """
        my_model = Product.objects.get(id=id)
        serializer = ProductSerializer(my_model, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    def delete(self, request, id):
        """
        Handle DELETE requests to delete a Product object
        """
        my_model = Product.objects.get(id=id)
        my_model.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)






