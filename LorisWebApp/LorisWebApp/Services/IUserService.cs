using LorisWebApp.DTO;

namespace LorisWebApp.Services
{
	public interface IUserService
	{
		List<User> GetAll();
		IEnumerable<User> Search(SearchParameter searchParameters);
	}
}