using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MobileServices.Common;
using MobileServices.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MobileServices.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class MobileController : ControllerBase
    {
        private readonly ILogger<MobileController> _logger;
        private readonly RDSContext _context;

        public MobileController(ILogger<MobileController> logger, RDSContext context)
        {
            _logger = logger;
            _context = context;
        }


        [HttpGet]
        public IEnumerable<Mobile> GetAll()
        {
            _logger.LogInformation("GetAll is called");

            return _context.Mobiles.ToList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Mobile>> GetById(int id)
        {
            _logger.LogInformation("GetById is called");
            var mobile = await _context.Mobiles.FindAsync(id);

            return mobile == null ? NotFound() : (ActionResult<Mobile>)mobile;
        }

        [HttpPost]
        public async Task<IActionResult> Save(Mobile mobile)
        {
            if (mobile.Id == 0)
            {
                _logger.LogInformation("Create new mobile is called");
                _context.Mobiles.Add(mobile);
            }
            else
            {
                if (await _context.Mobiles.FindAsync(mobile.Id) == null)
                    return NotFound("Not found mobile to update");

                _logger.LogInformation("Update a mobile is called");
                _context.Entry(mobile).State = EntityState.Modified;
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = mobile.Id }, mobile);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var mobile = await _context.Mobiles.FindAsync(id);
            if (mobile == null)
                return NotFound($"Not found mobile with id {id} to delete");

            _logger.LogInformation("Delete is called");
            _context.Mobiles.Remove(mobile);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAll), _context.Mobiles.ToList());
        }

        [HttpPost]
        public async Task<IActionResult> Order(MobileOrder order)
        {
            

            for(var i = 0; i < order.Ids.Length; i++)
            {
                var id = order.Ids[i];
                var mobile = await _context.Mobiles.FindAsync(id);

                if (mobile == null)
                    return NotFound($"Not found mobile with id {id} to this order");

                if (mobile.Instock < order.Quantity[i])
                    return BadRequest($"Stock is not enough {mobile.Name} to this order.");

                _context.Entry(mobile).State = EntityState.Modified;
                mobile.Instock -= order.Quantity[i];
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAll), _context.Mobiles.ToList());
        }
    }
}
