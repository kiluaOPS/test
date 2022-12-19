using System.Text.Json;

namespace LorisWebApp
{
	public sealed class PersistedContext
	{
		public List<User> Users;
		private static PersistedContext _instance;

		public static PersistedContext Instance
		{
			get
			{
				if (_instance == null)
				{
					_instance = new PersistedContext();
				}

				return _instance;
			}
		}

		private PersistedContext()
		{
			using (Stream reader = new FileStream("./usersfromenbdpoint.json", FileMode.Open))
			{
				Users = JsonSerializer.Deserialize<List<User>>(reader);
			}
		}
	}
}