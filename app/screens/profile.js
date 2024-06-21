import HomePageLayout from "../../components/layouts/HomePageLayout";
import { Text, View, TextInput, Pressable, ScrollView, ToastAndroid, ActivityIndicator } from "react-native";
import { Stack } from "expo-router";
import { colors } from "../../styles/colors";
import Feather from '@expo/vector-icons/Feather';
import { useState } from "react";
import * as Location from 'expo-location';
import { auth } from "../../api/firebaseConfig";

export default function profile() {
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [screen, setScreen] = useState("login");
    const [address, setAddress] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fetchingLocation, setFetchingLocation] = useState(false);

    async function initiateLocation() {
        setFetchingLocation(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            ToastAndroid.showWithGravity(
                'Permission to access location was denied',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
            setFetchingLocation(false);
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        if (location) {
            let url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.coords.latitude}&lon=${location.coords.longitude}&zoom=50&addressdetails=2`;
            let resp = await fetch(url);
            let addr = await resp.json();
            setAddress(addr?.display_name);
        }
        setFetchingLocation(false);
    }

    const handleLogin = async () => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
            ToastAndroid.showWithGravity(
                'Login Successful',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        } catch (error) {
            ToastAndroid.showWithGravity(
                error.message,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
    };

    const handleRegister = async () => {
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            ToastAndroid.showWithGravity(
                'Registration Successful',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        } catch (error) {
            ToastAndroid.showWithGravity(
                error.message,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
    };

    return (
        <HomePageLayout>
            <Stack.Screen
                options={{
                    title: 'Profile',
                    headerStyle: { backgroundColor: colors?.light },
                    headerTintColor: colors.dark,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />

            {screen === "login" && (
                <View style={{ height: "100%", width: "90%", alignSelf: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 50 }}>Login</Text>
                    <View style={styles.inputs}>
                        <TextInput
                            placeholder="Email or Mobile No."
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.inputs}>
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Enter Your Password"
                            secureTextEntry={secureTextEntry}
                        />
                        <Pressable onPress={() => setSecureTextEntry(!secureTextEntry)} style={{ position: "absolute", right: 0, top: 10 }}>
                            <Feather name={secureTextEntry ? "eye" : "eye-off"} size={18} color="black" />
                        </Pressable>
                    </View>
                    <Pressable style={styles.buttons} onPress={handleLogin}>
                        <Text style={{ textAlign: "center", color: colors?.light }}>Login</Text>
                    </Pressable>
                    <Pressable style={{ marginTop: 15 }}>
                        <Text style={{ textAlign: "center", color: "blue" }}>Forgot Password</Text>
                    </Pressable>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                        <Text>Don't have an account? </Text>
                        <Pressable onPress={() => setScreen("register")}>
                            <Text style={{ textAlign: "center", color: "blue" }}>Create</Text>
                        </Pressable>
                    </View>
                </View>
            )}

            {screen === "register" && (
                <ScrollView style={{ height: "100%", width: "90%", alignSelf: "center" }}>
                    <View style={{ alignSelf: "center", display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 50, marginTop: 50 }}>Register</Text>
                        <View style={styles.inputs}>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Email or Mobile No."
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ ...styles.inputs, width: "48%", marginRight: "1%" }}>
                                <TextInput value={firstName} onChangeText={setFirstName} placeholder="First Name" />
                            </View>
                            <View style={{ ...styles.inputs, width: "48%" }}>
                                <TextInput value={lastName} onChangeText={setLastName} placeholder="Last Name" />
                            </View>
                        </View>
                        <View style={styles.inputs}>
                            <TextInput
                                placeholder="Enter Your Password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={secureTextEntry}
                            />
                            <Pressable onPress={() => setSecureTextEntry(!secureTextEntry)} style={{ position: "absolute", right: 0, top: 10 }}>
                                <Feather name={secureTextEntry ? "eye" : "eye-off"} size={18} color="black" />
                            </Pressable>
                        </View>
                        <View style={styles.inputs}>
                            <TextInput
                                onChangeText={setAddress}
                                placeholder="Enter Your Address"
                                multiline={true}
                                value={address}
                            />
                        </View>
                        <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                            <Pressable onPress={initiateLocation} style={{ padding: 4, borderRadius: 8, alignSelf: "right" }}>
                                {fetchingLocation ? <ActivityIndicator size={"small"} /> :
                                    <Text style={{ fontSize: 16, color: "blue" }}>Use Location</Text>}
                            </Pressable>
                        </View>
                        <Pressable style={styles.buttons} onPress={handleRegister}>
                            <Text style={{ textAlign: "center", color: colors?.light }}>Register</Text>
                        </Pressable>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10, marginBottom: 50 }}>
                            <Text>Already have an account? </Text>
                            <Pressable onPress={() => setScreen("login")}>
                                <Text style={{ textAlign: "center", color: "blue" }}>Login</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            )}
        </HomePageLayout>
    );
}

const styles = {
    inputs: {
        width: "100%",
        padding: 10,
        borderColor: "black",
        borderBottomWidth: 1,
        marginBottom: 15
    },
    buttons: {
        width: "100%",
        marginTop: 15,
        height: 40,
        backgroundColor: colors.dark2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
};
