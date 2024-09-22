import {
	ExploreMountainCard,
	type ExploreMountainCardProps
} from "@/components/ExploreMountainCard";
import { ThemedSafeView } from "@/components/ThemedSafeView";
import { ThemedText } from "@/components/ThemedText";
import { FlatList, View } from "react-native";

type DataProps = ExploreMountainCardProps & { id: number };

const DATA: DataProps[] = [
	{
		id: 0,
		name: "Wysoki Hrothgar",
		pathCount: 20,
		location: "Biała Grań",
		backgroundImage:
			"https://static.wikia.nocookie.net/elderscrolls/images/f/fd/Gard%C5%82o_%C5%9Awiata_%28Skyrim%29.jpg/revision/latest/scale-to-width-down/1200?cb=20171124170408&path-prefix=pl"
	},
	{
		id: 1,
		name: "Wysoki Hrothgar",
		pathCount: 20,
		location: "Biała Grań",
		backgroundImage:
			"https://static.wikia.nocookie.net/elderscrolls/images/f/fd/Gard%C5%82o_%C5%9Awiata_%28Skyrim%29.jpg/revision/latest/scale-to-width-down/1200?cb=20171124170408&path-prefix=pl"
	},
	{
		id: 2,
		name: "Wysoki Hrothgar",
		pathCount: 20,
		location: "Biała Grań",
		backgroundImage:
			"https://static.wikia.nocookie.net/elderscrolls/images/f/fd/Gard%C5%82o_%C5%9Awiata_%28Skyrim%29.jpg/revision/latest/scale-to-width-down/1200?cb=20171124170408&path-prefix=pl"
	},
	{
		id: 3,
		name: "Wysoki Hrothgar",
		pathCount: 20,
		location: "Biała Grań",
		backgroundImage:
			"https://static.wikia.nocookie.net/elderscrolls/images/f/fd/Gard%C5%82o_%C5%9Awiata_%28Skyrim%29.jpg/revision/latest/scale-to-width-down/1200?cb=20171124170408&path-prefix=pl"
	},
	{
		id: 4,
		name: "Wysoki Hrothgar",
		pathCount: 20,
		location: "Biała Grań",
		backgroundImage:
			"https://static.wikia.nocookie.net/elderscrolls/images/f/fd/Gard%C5%82o_%C5%9Awiata_%28Skyrim%29.jpg/revision/latest/scale-to-width-down/1200?cb=20171124170408&path-prefix=pl"
	}
];

export default function Index() {
	return (
		<>
			<ThemedSafeView
				style={{
					flex: 1,
					alignItems: "center"
				}}
			>
				<FlatList
					style={{ width: "100%" }}
					contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
					ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
					data={DATA}
					renderItem={({ item }) => <ExploreMountainCard {...item} />}
					keyExtractor={(item) => item.id.toString()}
				/>
			</ThemedSafeView>
		</>
	);
}
