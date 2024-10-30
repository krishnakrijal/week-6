using Week6.Server.Dtos;
using Week6.Server.Models;

namespace Week6.Server.Mappers
{
   
        public static class CustomerMapper
        {
            public static Customer DtoToEntity(CustomerDto customerDto)
            {
                var customerEntity = new Customer
                {
                    Id = customerDto.Id,
                    FirstName = customerDto.FirstName,
                    LastName = customerDto.LastName,
                    DateOfBirth = customerDto.DateOfBirth,
                };

                return customerEntity;
            }

            public static CustomerDto EntityToDto(Customer customer)
            {
                var customerDto = new CustomerDto
                {
                    Id = customer.Id,
                    FirstName = customer.FirstName,
                    LastName = customer.LastName,
                    DateOfBirth = customer.DateOfBirth,
                };

                return customerDto;

            }
        }

    
}
