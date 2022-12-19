using LorisWebApp.DTO;
using LorisWebApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace LorisWebApp.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
	private readonly ILogger<UserController> _logger;
	private readonly IUserService _userService;

	public UserController(ILogger<UserController> logger, IUserService userService)
	{
		_logger = logger;
		_userService = userService;
	}

	[HttpGet]
	public IEnumerable<User> Get()
	{
		return _userService.GetAll();
	}
	
	[HttpPost]
	public IEnumerable<User> Search(SearchParameter searchParameters)
	{
		return _userService.Search(searchParameters);
	}
}