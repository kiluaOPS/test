using System.Text.Json;
using System.Text.Json.Serialization;

namespace LorisWebApp
{
	public class Location
	{
		public Street      street      { get; set; }
		public string      city        { get; set; }
		public string      state       { get; set; }
		public string      country     { get; set; }
		
		[JsonConverter(typeof(ObjectPrimitiveConverter))]
		public string      postcode    { get; set; }
		public Coordinates coordinates { get; set; }
		public Timezone    timezone    { get; set; }
	}

	public class ObjectPrimitiveConverter : JsonConverter<string>
	{
		public override string Read(ref System.Text.Json.Utf8JsonReader reader, Type typeToConvert, System.Text.Json.JsonSerializerOptions options) => 
			reader.TokenType switch
			{
				JsonTokenType.String                                    => reader.GetString(),
				JsonTokenType.Number when reader.TryGetInt32(out var i) => $"{i}",
				//Add other cases as needed:
				//JsonTokenType.Number when reader.TryGetInt64(out var l) => l,
				//JsonTokenType.Number when reader.TryGetDouble(out var d) => d,
				//JsonTokenType.True => true,
				//JsonTokenType.False => false,
				_ => throw new JsonException(), // StartObject, StartArray, Null    
			};
		public override void Write(Utf8JsonWriter writer, string value, JsonSerializerOptions options) =>
			JsonSerializer.Serialize(writer, value, value.GetType() /*, options */); // Passing options when ObjectPrimitiveConverter has been added to options.Converters will cause a stack overflow
	}
	
}