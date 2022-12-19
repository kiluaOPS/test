using System.Text.Json;
using LorisWebApp.DTO;

namespace LorisWebApp.Services
{
	public class UserService : IUserService
	{
		private PersistedContext _persistedContext;
		public UserService()
		{
			_persistedContext = PersistedContext.Instance;
		}

		public List<User> GetAll()
		{
			return _persistedContext.Users;
		}

		public IEnumerable<User> Search(SearchParameter searchParameters)
		{
			var a = _persistedContext.Users
									.Where(x => x.name.first.StartsWith(searchParameters.Value))
									.Take(searchParameters.Pagination.Take)
									.Skip(searchParameters.Pagination.Take * (searchParameters.Pagination.Page -1) );
			return a;
		}
	}
}