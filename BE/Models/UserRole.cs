using System.Collections.Generic;

namespace MobileServices.Models
{
    public class UserRole
    {
        public RoleEnum Role { get; set; }
        public IList<int> UserIds { get; set; }
    }

    public enum RoleEnum
    {
        Admin = 0,
        Guest = 1
    }
}
