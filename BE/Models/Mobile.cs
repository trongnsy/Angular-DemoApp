﻿using MobileServices.ViewModels;

namespace MobileServices.Models
{
    public class Mobile
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Instock { get; set; }
        public string Description { get; set; }
        public string ImageSource { get; set; }

        public Mobile() { }

        public Mobile(MobileForm mobile)
        {
            Id = mobile.Id;
            Name = mobile.Name;
            Price = mobile.Price;
            Instock = mobile.Instock;
            Description = mobile.Description;
            ImageSource = mobile.ImageSource;
        }
    }
}
